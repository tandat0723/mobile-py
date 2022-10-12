import axios from "axios"
import cookies from "react-cookies"

export let endpoints = {
    'categories': '/categories/',
    'banners':'/banners/',
    'categoryproducts':'/categoryproducts/',
    'products':'/products/',
    'productcategories':(category) => `/categories/${category}/products/`,
    'productdetail': (product) => `/products/${product}/`,
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