from django.template.context import make_context
from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer
from .models import Product, Category, Os, Manufacturer, Order, OrderDetail, CategoryProduct, User, Tag, \
    Comment, Rate, Action, ProductView, Banner


class CategorySerializer(ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        request = self.context['request']
        path = '/static/%s' % obj.image.name

        return request.build_absolute_uri(path)

    class Meta:
        model = Category
        fields = '__all__'


class CategoryProductSerializer(ModelSerializer):
    class Meta:
        model = CategoryProduct
        fields = '__all__'


class BannerSerializer(ModelSerializer):
    image = SerializerMethodField()

    class Meta:
        model = Banner
        fields = ['id', 'name', 'image']

    def get_image(self, obj):
        request = self.context['request']

        if obj.image and not obj.image.name.startswith("/static"):
            path = '/static/%s' % obj.image.name

            return request.build_absolute_uri(path)


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class ProductSerializer(ModelSerializer):
    image = SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'category', 'image', 'quantity']

    def get_image(self, obj):
        request = self.context['request']

        if obj.image and not obj.image.name.startswith("/static"):
            path = '/static/%s' % obj.image.name

            return request.build_absolute_uri(path)


class ProductDetailSerializer(ProductSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = ProductSerializer.Meta.model
        fields = ProductSerializer.Meta.fields + ['description', 'tags']


class UserSerializer(ModelSerializer):
    # image = serializers.SerializerMethodField(source='image')
    #
    # def get_image(self, obj):
    #     request = self.context['request']
    #
    #     if obj.image and not obj.image.name.startswith("/static"):
    #         path = '/static/%s' % obj.image.name
    #
    #         return request.build_absolute_uri(path)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'password', 'email', 'date_joined']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        data = validated_data.copy()
        user = User(**data)
        user.set_password(user.password)
        user.save()

        return user


class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class RateSerializer(ModelSerializer):
    class Meta:
        model = Rate
        fields = ['id', 'rate', 'created_date']


class ActionSerializer(ModelSerializer):
    class Meta:
        model = Action
        fields = ['id', 'type', 'created_date']


class ProductViewSerializer(ModelSerializer):
    class Meta:
        model = ProductView
        fields = ['id', 'views', 'product']
