from typing import Union
from django.http import Http404
from rest_framework import viewsets, permissions, generics, status
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.settings import settings
from .models import Product, Category, CategoryProduct, User, Tag, Action, Rate, Comment, ProductView
from rest_framework.response import responses, Response
from .serializers import ProductSerializer, CategorySerializer, CategoryProductSerializer, UserSerializer, \
    ProductDetailSerializer, ActionSerializer, RateSerializer, CommentSerializer, ProductViewSerializer
from drf_yasg.utils import swagger_auto_schema
from .paginators import ProductPaginator
from django.db.models import F


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.filter(active=True)
    serializer_class = CategorySerializer

    def get_queryset(self):
        q = self.queryset

        kw = self.request.query_params.get('kw')
        if kw:
            q = q.filter(name__icontains=kw)
        return q


class CategoryProductViewSet(viewsets.ViewSet, generics.ListAPIView):
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


class ProductViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = Product.objects.filter(active=True)
    serializer_class = ProductDetailSerializer

    def get_permissions(self):
        if self.action in ['add_comment', 'take_action', 'rate']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        queryset = self.queryset
        kw = self.request.query_params.get('kw')
        if kw is not None:
            queryset = queryset.filter(name__icontains=kw)

        category_product = self.request.query_params.get('category_product')
        if category_product is not None:
            queryset = queryset.filter(category_product=category_product)

        return queryset

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

    @action(methods=['post'], detail=True, url_path='add-comment')
    def add_comment(self, request, pk):
        content = request.data.get('content')
        if content is not None:
            c = Comment.objects.create(content=content,
                                       creator=request.user,
                                       product=self.get_object())
            return Response(CommentSerializer(c, context={'request': request}).data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=True, url_path='like')
    def take_action(self, request, pk):
        try:
            action_type = int(request.data['type'])
        except Union[IndexError, ValueError]:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            actions = Action.objects.create(type=action_type,
                                            creator=request.user,
                                            product=self.get_object())

        return Response(ActionSerializer(actions, context={'request': request}).data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='rating')
    def rate(self, request, pk):
        try:
            rate = int(request.data['rate'])
        except Union[IndexError, ValueError]:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            r = Rate.objects.create(rate=rate,
                                    creator=request.user,
                                    product=self.get_object())
            if rate > 5:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(RateSerializer(r, context={'request': request}).data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path='views')
    def inc_view(self, request, pk):
        view, created = ProductView.objects.get_or_create(product=self.get_object())
        view.views = F('views') + 1
        view.save()
        view.refresh_from_d()

        return Response(ProductViewSerializer(view, context={'request': request}).data, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'get_current_user':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path="current-user")
    def get_current_user(self, request):
        return Response(self.serializer_class(request.user, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class OauthInfo(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status=status.HTTP_200_OK)


class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        if request.user == self.get_object().creator:
            return super().destroy(request, *args, **kwargs)
        return Response(status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, *args, **kwargs):
        if request.user == self.get_object().creator:
            return super().partial_update(request, *args, **kwargs)
        return Response(status=status.HTTP_403_FORBIDDEN)

