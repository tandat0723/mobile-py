from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField


class User(AbstractUser):
    avatar = models.ImageField(blank=True, upload_to='users/%Y/%m')


class Category(models.Model):
    name = models.CharField(null=True, max_length=50, unique=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Manufacturer(models.Model):
    name = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.name


class Os(models.Model):
    name = models.CharField(null=False, max_length=50)

    def __str__(self):
        return self.name


class CategoryProduct(models.Model):
    name = models.CharField(null=True, max_length=50)
    category = models.ForeignKey(Category, null=True, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(null=False, max_length=255)
    category = models.ForeignKey(Category, null=True, on_delete=models.CASCADE)
    manufacturer = models.ForeignKey(Manufacturer, null=True, on_delete=models.CASCADE)
    category_products = models.ForeignKey(CategoryProduct, null=True, on_delete=models.CASCADE)
    os = models.ForeignKey(Os, null=True, on_delete=models.CASCADE)
    price = models.CharField(max_length=14)
    quantity = models.CharField(max_length=6)
    active = models.BooleanField(default=True)
    image = models.ImageField(blank=True, upload_to='products/%Y/%m')
    description = RichTextField()

    class Meta:
        unique_together = ("name", "category")

    def __str__(self):
        return self.name


class Color(models.Model):
    name = models.CharField(max_length=15)

    def __str__(self):
        return self.name


class ProductCode(models.Model):
    product_id = models.ForeignKey(Product, null=True, on_delete=models.CASCADE)
    color = models.ForeignKey(Color, null=True, on_delete=models.CASCADE)
    price = models.CharField(max_length=14)
    num_photo = models.CharField(max_length=2, blank=True)

    class Meta:
        unique_together = ('product_id', 'color')

    def __str__(self):
        return self.product_id


class Province(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class District(models.Model):
    name = models.CharField(max_length=50)
    province = models.ForeignKey(Province, null=True, related_name='district', related_query_name='my_district',
                                 on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Store(models.Model):
    address = models.CharField(max_length=255, blank=True)
    district = models.ForeignKey(District, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=True)
    phone = models.CharField(max_length=11)
    fax = models.CharField(max_length=255)
    email = models.CharField(max_length=20)
    image = models.ImageField(blank=True, upload_to='stores/%Y/%m')
    description = RichTextField()
    open_hour = models.CharField(max_length=200)
    province = models.ForeignKey(Province, null=True, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('name', 'district')

    def __str__(self):
        return self.name


class ProductStoreCode(models.Model):
    product_code = models.ForeignKey(ProductCode, null=True, on_delete=models.CASCADE)
    store = models.ForeignKey(Store, blank=True, on_delete=models.CASCADE)
    province = models.ForeignKey(Province, blank=True, on_delete=models.CASCADE)
    district = models.ForeignKey(District, blank=True, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, blank=True, on_delete=models.CASCADE)
    quantity = models.CharField(max_length=7)

    class Meta:
        unique_together = ('product_code', 'store')


class Order(models.Model):
    username = models.CharField(max_length=50)
    phone = models.CharField(max_length=11)
    address = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now=True)
    total = models.CharField(max_length=14)
    approve = models.BooleanField(default=False)
    delivery_status = models.BooleanField(default=False)

    def __str__(self):
        return self.username


class OrderDetail(models.Model):
    order = models.ForeignKey(Order, related_name='order_detail', related_query_name='my_order_detail',
                              on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='product_detail', related_query_name='my_product_detail',
                                on_delete=models.CASCADE)
    quantity = models.CharField(max_length=2)
    price = models.CharField(max_length=14)

    class Meta:
        unique_together = ('order', 'product')

    def __str__(self):
        return self.order


class Comment(models.Model):
    product = models.ForeignKey(Product, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, blank=True, on_delete=models.CASCADE)
    email = models.CharField(max_length=30)
    content = RichTextField()

    class Meta:
        unique_together = ('product', 'user')


class Like(models.Model):
    product = models.ForeignKey(Product, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, blank=True, on_delete=models.CASCADE)
    active = models.BooleanField(default=False)

    class Meta:
        unique_together = ('product', 'user')


class Rate(models.Model):
    rate = models.SmallIntegerField(default=0)
    product = models.ForeignKey(Product, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, blank=True, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('product', 'user')
