import axios from 'axios';
import {ApiRoutes} from "../routes/routeConstants/apiRoutes";

export const getHeaders = () => {
    let headers;
    const accessToken = localStorage.getItem("accessToken");
  

    if (accessToken) {
      headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer".concat(" ",accessToken),
      };
    }

    return headers;
  };
  

const axiosInstance = axios.create({
    baseURL: ApiRoutes.BASE_URL,
    timeout: 20000,
});

axiosInstance.interceptors.request.use(function (config) {
    config.headers = getHeaders();
    return config;
});

axiosInstance.interceptors.response.use(
    (response): any => {
        return {
            data: response.data,
            message: response.statusText,
            status: response.status,
            headers: response?.headers,
        }
    },
    (error) => {
        const { response } = error;
        if (response.status === 401) {
            localStorage.clear();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
