import axios from 'axios';
import axiosRetry from 'axios-retry';

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.withCredentials = true;

axiosRetry(axios, { retries: 7, retryDelay: axiosRetry.exponentialDelay });

export default axios;
