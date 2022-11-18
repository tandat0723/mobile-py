from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Category, Product, Manufacturer, Os, CategoryProduct, Banner, Like, Rate, \
                    Comment, Tag, Price, Memory, Photo, User
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django import forms


class ProductForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Product
        fields = '__all__'


class ProductAdmin(admin.ModelAdmin):
    form = ProductForm
    list_display = ['name', 'category_product', 'os', 'manufacturer', 'quantity']
    list_filter = ['category_product']
    search_fields = ['name']
    readonly_fields = ['images']

    def images(self, img):
        if img:
            return mark_safe('<img src="/static/{url}" width="200" />'.format(url=img.image.name))


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']
    list_filter = ['name']
    search_fields = ['name']


class BannerAdmin(admin.ModelAdmin):
    list_display = ['name']
    readonly_fields = ['images']

    def images(self, img):
        if img:
            return mark_safe('<img src="/static/{url}" width="200" />'.format(url=img.image.name))


class ManufacturerAdmin(admin.ModelAdmin):
    list_display = ['name']
    list_filter = ['name']
    search_fields = ['name']


class OsAdmin(admin.ModelAdmin):
    list_display = ['name']
    list_filter = ['name']
    search_fields = ['name']


class CategoryProductAdmin(admin.ModelAdmin):
    list_display = ['name']
    list_filter = ['name']
    search_fields = ['name']


class CommentAdmin(admin.ModelAdmin):
    list_display = ['content_comment', 'user', 'product', 'created_date']
    list_filter = ['user', 'product']
    search_fields = ['user', 'product']


class RateAdmin(admin.ModelAdmin):
    list_display = ['rate', 'user', 'product', 'created_date']
    list_filter = ['user', 'product']
    search_fields = ['user', 'product']


class MemoryAdmin(admin.ModelAdmin):
    list_display = ['name']
    list_filter = ['name']
    search_fields = ['name']


class PriceAdmin(admin.ModelAdmin):
    list_display = ['product', 'memory', 'name']
    list_filter = ['product', 'memory']
    search_fields = ['product', 'memory']


class PhotoAdmin(admin.ModelAdmin):
    list_display = ['product']
    list_filter = ['product']
    search_fields = ['product']
    readonly_fields = ['images']

    def images(self, img):
        if img:
            return mark_safe('<img src="/static/{url}" width="200" />'.format(url=img.image.name))


class UserAdmin(admin.ModelAdmin):
    readonly_fields = ['avatars']

    def avatars(self, img):
        if img:
            return mark_safe('<img src="/static/{url}" width="200" />'.format(url=img.avatar.name))


admin.site.register(User, UserAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Manufacturer, ManufacturerAdmin)
admin.site.register(Os, OsAdmin)
admin.site.register(CategoryProduct, CategoryProductAdmin)
admin.site.register(Banner, BannerAdmin)
admin.site.register(Like)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Rate, RateAdmin)
admin.site.register(Tag)
admin.site.register(Memory, MemoryAdmin)
admin.site.register(Price, PriceAdmin)
admin.site.register(Photo, PhotoAdmin)
