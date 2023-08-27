import axios from 'axios';
const BASE_URL = 'http://localhost/rest-api-c4/public/';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});