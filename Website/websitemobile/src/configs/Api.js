import axios from "axios"

export let endpoints = {
    'categories': '/categories/'
}

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})