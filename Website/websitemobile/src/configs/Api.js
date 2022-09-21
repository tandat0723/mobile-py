import axios from "axios"
import cookies from "react-cookies"

export let endpoints = {
    'categories': '/categories/',
    'banners':'/banners/',
    'categoryproducts':'/categoryproducts/',
    'products':'/products/',
    // 'products':(categoryId) => `/categories/${categoryId}/products/`,
    'phoneproducts':'/categories/1/products/',
    'ipadproducts':'/categories/2/products/',
    'macproducts':'/categories/3/products/',
    'watchproducts':'/categories/4/products/',
    'soundproducts':'/categories/5/products/',
    'accessoryproducts':'/categories/6/products/',
    'product-detail': (productId) => `/products/${productId}/`,
    'login':'/o/token/',
    'current-user':'/users/current-user/',
    'oauth2-info':'/oauth2-info/',
}

export let oauthApis = () => {
    return axios.create({
        baseURL:'http://127.0.0.1:8000/',
        headers: {
            'Authorization': `Bearer ${cookies.load('access_token')}`
        }
    })
}

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})