from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Product, Category, Os, Manufacturer, Order, OrderDetail, CategoryProduct


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CategoryProductSerializer(ModelSerializer):
    class Meta:
        model = CategoryProduct
        fields = ['id', 'name']


class ProductSerializer(ModelSerializer):
    image = serializers.SerializerMethodField(source='image')

    def get_image(self, obj):
        request = self.context['request']
        path = '/static/%s' % obj.image.name

        return request.build_absolute_uri(path)

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'category', 'image', 'description']
