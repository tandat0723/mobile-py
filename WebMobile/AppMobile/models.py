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


class Banner(models.Model):
    name = models.CharField(max_length=20)
    image = models.ImageField(blank=True, upload_to='banners/%Y/%m')
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
    name = models.CharField(null=True, max_length=50, unique=True)
    category = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ('name', 'category')
        ordering = ['name']


class Product(models.Model):
    name = models.CharField(null=False, max_length=255)
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE)
    category_product = models.ForeignKey(CategoryProduct, related_name='products', on_delete=models.CASCADE)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    os = models.ForeignKey(Os, on_delete=models.CASCADE)
    quantity = models.CharField(max_length=6)
    active = models.BooleanField(default=True)
    image = models.ImageField(blank=True, upload_to='products/%Y/%m')
    price = models.CharField(blank=True, default=0, max_length=20)
    description = RichTextField()
    content = RichTextField()
    detail = RichTextField()
    tags = models.ManyToManyField('Tag', related_name='products', blank=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        unique_together = ('name', 'category')


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Memory(models.Model):
    name = models.CharField(max_length=20)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Price(models.Model):
    name = models.CharField(max_length=30)
    memory = models.ForeignKey(Memory, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='products', on_delete=models.CASCADE)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Photo(models.Model):
    image = models.ImageField(blank=True, upload_to='photos/%Y/%m')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.product


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
    order = models.ForeignKey(Order, related_name='order_detail', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='product_detail', on_delete=models.CASCADE)
    quantity = models.CharField(max_length=2)
    price = models.CharField(max_length=14)

    class Meta:
        unique_together = ('order', 'product')

    def __str__(self):
        return self.order


class ActionBase(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class Action(ActionBase):
    LIKE, UNLIKE = range(2)
    ACTIONS = [
        (LIKE, 'like'),
        (UNLIKE, 'unlike')
    ]
    type = models.PositiveSmallIntegerField(choices=ACTIONS, default=LIKE)


class Rate(ActionBase):
    rate = models.PositiveSmallIntegerField(default=0)


class Comment(ActionBase):
    comment = models.TextField()
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.comment


class ProductView(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    views = models.IntegerField(default=0)
    product = models.OneToOneField(Product, on_delete=models.CASCADE)
