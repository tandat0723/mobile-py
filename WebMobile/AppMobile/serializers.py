from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer
from .models import Product, Category, Os, Manufacturer, CategoryProduct, User, Tag, \
    Comment, ProductView, Banner, Memory, Price, Photo


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
        fields = ['id', 'name']


class ProductSerializer(ModelSerializer):
    image = SerializerMethodField()
    tags = TagSerializer(many=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'price', 'image', 'quantity', 'tags']

    def get_image(self, obj):
        request = self.context['request']

        if obj.image and not obj.image.name.startswith("/static"):
            path = '/static/%s' % obj.image.name

            return request.build_absolute_uri(path)


class ProductDetailSerializer(ProductSerializer):
    class Meta:
        model = Product
        fields = ProductSerializer.Meta.fields + ['description', 'content', 'detail']


class PermissionProductDetailSerializer(ProductDetailSerializer):
    like = SerializerMethodField()
    rating = SerializerMethodField()

    def get_like(self, product):
        request = self.context.get('request')
        if request:
            return product.like_set.filter(user=request.user, active=True).exists()

    def get_rating(self, product):
        request = self.context.get('request')
        if request:
            r = product.rating_set.filter(user=request.user).first()
            if r:
                return r.rate

    class Meta:
        model = Product
        fields = ProductDetailSerializer.Meta.fields + ['like', 'rating']


class UserSerializer(ModelSerializer):
    avatar = SerializerMethodField(source='avatar')

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'avatar', 'password', 'email', 'date_joined']
        extra_kwargs = {
            'password': {
                'write_only': True
            }, 'avatar': {
                'read_only': True,
                'write_only': True
            }
        }

    def get_avatar(self, avt):
        request = self.context['request']
        if avt.avatar and not avt.avatar.name.startswith('/static'):
            path = '/static/%s' % avt.avatar.name

            return request.build_absolute_uri(path)

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(user.password)
        user.save()

        return user


class CreateCommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ['content_comment', 'product', 'user', 'created_date', 'updated_date']


class CommentSerializer(CreateCommentSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        exclude = ['active']


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
