from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer
from .models import Product, Category, Os, Manufacturer, Order, OrderDetail, CategoryProduct, User, Tag, \
    Comment, Rate, Action, ProductView, Banner, Memory, Price, Color, Photo, ProductCode


class CategorySerializer(ModelSerializer):
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


class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'comment', 'updated_date', 'created_date']


class RateSerializer(ModelSerializer):
    class Meta:
        model = Rate
        fields = ['id', 'rate', 'created_date']


class ProductSerializer(ModelSerializer):
    image = SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'image', 'quantity']

    def get_image(self, obj):
        request = self.context['request']

        if obj.image and not obj.image.name.startswith("/static"):
            path = '/static/%s' % obj.image.name

            return request.build_absolute_uri(path)


class ProductDetailSerializer(ProductSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = ProductSerializer.Meta.model
        fields = ProductSerializer.Meta.fields + ['description', 'content', 'detail', 'tags']


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'avatar', 'password', 'email', 'date_joined']
        extra_kwargs = {
            'password': {
                'write_only': 'true'
            }
        }

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(user.password)
        user.save()

        return user


class ActionSerializer(ModelSerializer):
    class Meta:
        model = Action
        fields = ['id', 'type', 'created_date']


class ProductViewSerializer(ModelSerializer):
    class Meta:
        model = ProductView
        fields = ['id', 'views', 'product']


class MemorySerializer(ModelSerializer):
    class Meta:
        model = Memory
        fields = ['id', 'name']


class PriceSerializer(ModelSerializer):
    class Meta:
        model = Price
        fields = '__all__'


class ColorSerializer(ModelSerializer):
    class Meta:
        model = Color
        fields = ['id', 'name']


class PhotoSerializer(ModelSerializer):
    image = SerializerMethodField()

    class Meta:
        model = Photo
        fields = ['id', 'name', 'image', 'product']

    def get_image(self, obj):
        request = self.context['request']

        if obj.image and not obj.image.name.startswith("/static"):
            path = '/static/%s' % obj.image.name

            return request.build_absolute_uri(path)


class ProductCodeSerializer(ModelSerializer):
    class Meta:
        model = ProductCode
        fields = '__all__'



