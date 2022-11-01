import axios from "axios"


export const endpoints = {
    'categories': '/categories/',
    'banners':'/banners/',
    'categoryproducts':'/categoryproducts/',
    'products':'/products/',
    'productcategories':(category) => `/categories/${category}/products/`,
    'product-detail': (product) => `/products/${product}/`,
    'login':'/o/token/',
    'register':'/users/',
    'current-user':'/users/current-user/',
    'oauth2-info':'/oauth2-info/',
    'memories': '/memories/',
    'product-comments': (product) => `/products/${product}/comment/`,
    'comments': '/comments/',
    'like-product': (product) => `/products/${product}/like/`,
    'rate-product': (product) => `/products/${product}/rating/`,
}

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})