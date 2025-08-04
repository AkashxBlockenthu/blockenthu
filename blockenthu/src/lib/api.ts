import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Use proxy in both development and production
});

export default api;
