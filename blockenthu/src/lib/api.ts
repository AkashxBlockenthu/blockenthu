import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-35-95-134-254.us-west-2.compute.amazonaws.com:3000/api',
});

export default api;
