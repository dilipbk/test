import axios from 'axios';
const BASE_URL = 'http://localhost/rest-api-c4/public/';
//const BASE_URL = 'https://api.diamondthreading.com/';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});