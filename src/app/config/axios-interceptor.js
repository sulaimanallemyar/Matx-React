import axios from 'axios';

import { SERVER_API_URL } from 'app/utils/constant';

// // export const SERVER_API_URL = 'http://10.31.11.121:8081/api';
// const TIMEOUT = 1 * 60 * 1000;
// axios.defaults.timeout = TIMEOUT;
// axios.defaults.baseURL = SERVER_API_URL;

// // axios instance for making requests
// const axiosInstance = axios.create();

// // request interceptor for adding token
// axiosInstance.interceptors.request.use((config) => {
//   // add token to request headers
//   config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
//   return config;
// });

// export default axiosInstance;

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

const setupAxiosInterceptors = (onUnauthenticated) => {
  const onRequestSuccess = (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onResponseSuccess = (response) => response;
  const onResponseError = (err) => {
    const status = err.status || (err.response ? err.response.status : 0);

    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
