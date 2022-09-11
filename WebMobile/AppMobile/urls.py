from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('products', views.ProductViewSet, 'product')
router.register('categories', views.CategoryViewSet, 'category')
router.register('categoryproducts', views.CategoryProductViewSet, 'category product')
router.register('users', views.UserViewSet, 'user')
router.register('comments', views.CommentViewSet, 'comment')
router.register('banners', views.BannerViewSet, 'banner')

urlpatterns = [
    path('', include(router.urls)),
    path('oauth2-info', views.OauthInfo.as_view())
]
