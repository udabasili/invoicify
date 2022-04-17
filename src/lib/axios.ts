import { apiUrl } from "@/config";
import { useRefreshToken } from "@/utils/refreshToken";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

let baseUrl = "";

if (process.env.NODE_ENV === "production") {
  baseUrl = '';
} 

export const apiCall = axios.create({
  baseURL: baseUrl + '/api/',
  withCredentials: true
});

apiCall.interceptors.response.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error) => {
    const errorObject = error as AxiosError;
    const message = error.response?.data?.message || error.message;
    if (message.includes("ECONNREFUSED")) {
      error.response.data = "server down";
    } else if (message === "JWT Expired") {
      new Promise((resolve, reject) => {
        useRefreshToken(errorObject.config)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
);

export const fetcher = (url: string) => apiCall.get(url).then(res => res.data.message)
