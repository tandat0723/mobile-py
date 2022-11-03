from typing import Union
from django.http import Http404
from rest_framework import viewsets, permissions, generics, status
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from rest_framework.settings import settings
from .models import Product, Category, CategoryProduct, User, Tag, Like, Rate, Comment, ProductView, Banner, Memory, \
    Price
from rest_framework.response import Response
from .permissons import CommentOwner
from .serializers import ProductSerializer, CategorySerializer, CategoryProductSerializer, UserSerializer, \
    ProductDetailSerializer, CommentSerializer, ProductViewSerializer, \
    BannerSerializer, MemorySerializer, PriceSerializer, CreateCommentSerializer, PermissionProductDetailSerializer
from drf_yasg.utils import swagger_auto_schema
from .paginators import ProductPaginator


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.filter(active=True)
    serializer_class = CategorySerializer

    def get_queryset(self):
        q = self.queryset

        kw = self.request.query_params.get('kw')
        if kw:
            q = q.filter(name__icontains=kw)
        return q

    @action(methods=['get'], detail=True, url_path='products')
    def get_products(self, request, pk):
        products = Category.objects.get(pk=pk).products.filter(active=True)
        kw = request.query_params.get('kw')
        if kw is not None:
            products = products.filter(name__icontains=kw)

        return Response(data=ProductSerializer(products, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class CategoryProductViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = CategoryProduct.objects.filter(active=True)
    serializer_class = CategoryProductSerializer

    def get_queryset(self):
        queryset = self.queryset
        kw = self.request.query_params.get('kw')
        if kw is not None:
            queryset = queryset.filter(name__icontains=kw)

        category = self.request.query_params.get('category')
        if category is not None:
            queryset = queryset.filter(category_id=category)

        return queryset

    @swagger_auto_schema(
        operation_description="Get the product for category product",
        responses={
            status.HTTP_200_OK: ProductSerializer()
        }
    )
    @action(methods=['get'], detail=True, url_path='products')
    def get_products(self, request, pk):
        products = CategoryProduct.objects.get(pk=pk).products.filter(active=True)
        kw = request.query_params.get('kw')
        if kw is not None:
            products = products.filter(name__icontains=kw)

        return Response(data=ProductSerializer(products, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class ProductViewSet(viewsets.ViewSet, generics.RetrieveAPIView, generics.ListAPIView):
    queryset = Product.objects.filter(active=True)
    serializer_class = ProductDetailSerializer
    pagination_class = ProductPaginator
    parser_classes = [MultiPartParser, ]

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return PermissionProductDetailSerializer

        return ProductDetailSerializer

    def get_parsers(self):
        if getattr(self, 'swagger_fake_view', False):
            return []

        return super().get_parsers()

    def get_permissions(self):
        if self.action in ['take_action', 'rating']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    def get_queryset(self):
        queryset = self.queryset
        product = self.request.query_params.get('kw')
        if product is not None:
            queryset = queryset.filter(name__icontains=product)

        category_product = self.request.query_params.get('category_product')
        if category_product is not None:
            queryset = queryset.filter(category_product=category_product)

        category = self.request.query_params.get('category')
        if category is not None:
            queryset = queryset.filter(category=category)

        return queryset

    @swagger_auto_schema(
        operation_description='Get comment for a product',
        responses={
            status.HTTP_200_OK: CommentSerializer()
        }
    )
    @action(methods=['post'], detail=True, url_path="tags")
    def add_tag(self, request, pk):

        try:
            products = self.get_object()
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            tags = request.data.get('tags')
            if tags is not None:
                for tag in tags:
                    t, _ = Tag.objects.get_or_create(name=tag)
                    products.tags.add(t)
                products.save()
                return Response(self.serializer_class(products, context={'request': request}).data,
                                status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_404_NOT_FOUND)

    @action(methods=['get'], detail=True, url_path='comments')
    def get_comment(self, request, pk):
        product = self.get_object()
        comments = product.comments.select_related('user').filter(active=True)

        return Response(CommentSerializer(comments, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='like')
    def like(self, request, pk):
        product = self.get_object()
        user = request.user

        l, _ = Like.objects.get_or_create(product=product, user=user)
        l.active = not l.active
        try:
            l.save()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(data=PermissionProductDetailSerializer(product, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='rating')
    def rating(self, request, pk):
        product = self.get_object()
        user = request.user

        r,_ = Rate.objects.get_or_create(product=product,user=user)
        r.rate = request.data.get('rate', 0)
        try:
            r.save()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(data=PermissionProductDetailSerializer(product, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, ]

    def get_permissions(self):
        if self.action == 'current_user':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path="current-user")
    def current_user(self, request):
        return Response(self.serializer_class(request.user, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class OauthInfo(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status=status.HTTP_200_OK)


class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.UpdateAPIView, generics.CreateAPIView):
    queryset = Comment.objects.filter(active=True)
    serializer_class = CreateCommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['update', 'destroy']:
            return [CommentOwner()]

        return [permissions.IsAuthenticated()]


class MyProductView(generics.ListCreateAPIView):
    lookup_field = ['name']
    queryset = CategoryProduct.objects.filter(active=True)
    serializer_class = CategoryProductSerializer


class MyProductDetailView(generics.RetrieveAPIView):
    queryset = CategoryProduct.objects.filter(active=True)
    serializer_class = CategoryProductSerializer


class BannerViewSet(viewsets.ViewSet, generics.ListCreateAPIView):
    queryset = Banner.objects.filter(active=True)
    serializer_class = BannerSerializer


class MemoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Memory.objects.filter(active=True)
    serializer_class = MemorySerializer


class PriceViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Price.objects.filter(active=True)
    serializer_class = PriceSerializer
