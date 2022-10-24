from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Category, Product, Manufacturer, Os, Order, OrderDetail, CategoryProduct, Store, Province, \
    District, Banner, Action, Rate, Comment, Tag, Color, Price, ProductCode, Memory, Photo
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django import forms


class ProductForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Product
        fields = '__all__'


class StoreForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Store
        fields = '__all__'


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


class ProductAdmin(admin.ModelAdmin):
    form = ProductForm
    list_display = ['name', 'category_product', 'os', 'manufacturer', 'quantity']
    list_filter = ['category_product']
    search_fields = ['name']
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


class StoreAdmin(admin.ModelAdmin):
    forms = StoreForm
    list_display = ['name', 'phone', 'open_hour', 'province']
    list_filter = ['province']
    search_fields = ['name', 'phone', 'province']
    readonly_fields = ['images']

    def images(self, img):
        if img:
            return mark_safe('<img src="/static/{url}" width="200" />'.format(url=img.image.name))


class ProvinceAdmin(admin.ModelAdmin):
    search_fields = ['name']


class DistrictAdmin(admin.ModelAdmin):
    list_display = ['name', 'province']
    list_filter = ['province']
    search_fields = ['name']


class CommentAdmin(admin.ModelAdmin):
    list_display = ['comment', 'creator', 'product', 'created_date']
    list_filter = ['creator', 'product']
    search_fields = ['creator', 'product']


class RateAdmin(admin.ModelAdmin):
    list_display = ['rate', 'creator', 'product', 'created_date']
    list_filter = ['creator', 'product']
    search_fields = ['creator', 'product']


class ActionAdmin(admin.ModelAdmin):
    list_display = ['type', 'creator', 'product', 'created_date']
    list_filter = ['creator']
    search_fields = ['creator', 'product']


class MemoryAdmin(admin.ModelAdmin):
    list_display = ['name']
    list_filter = ['name']
    search_fields = ['name']


class PriceAdmin(admin.ModelAdmin):
    list_display = ['product', 'memory', 'name']
    list_filter = ['product', 'memory']
    search_fields = ['product', 'memory']


class PhotoAdmin(admin.ModelAdmin):
    list_display = ['name', 'product']
    list_filter = ['product']
    search_fields = ['product']
    readonly_fields = ['images']

    def images(self, img):
        if img:
            return mark_safe('<img src="/static/{url}" width="200" />'.format(url=img.image.name))


class ProductCodeAdmin(admin.ModelAdmin):
    list_display = ['product', 'color']
    list_filter = ['product']
    search_fields = ['product']


admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Manufacturer, ManufacturerAdmin)
admin.site.register(Os, OsAdmin)
admin.site.register(Order)
admin.site.register(CategoryProduct, CategoryProductAdmin)
admin.site.register(OrderDetail)
admin.site.register(Store, StoreAdmin)
admin.site.register(Province, ProvinceAdmin)
admin.site.register(District, DistrictAdmin)
admin.site.register(Banner, BannerAdmin)
admin.site.register(Action, ActionAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Rate, RateAdmin)
admin.site.register(Tag)
admin.site.register(Memory, MemoryAdmin)
admin.site.register(Color)
admin.site.register(ProductCode, ProductCodeAdmin)
admin.site.register(Price, PriceAdmin)
admin.site.register(Photo, PhotoAdmin)
