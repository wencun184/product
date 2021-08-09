import axios from "axios";
import { getToken } from "./auth";
const instance = axios.create({
  baseURL: "http://localhost:3009",
  timeout: 1000,
});

//全局请求拦截
instance.interceptors.request.use(
  function(config) {
    if (getToken()) {
      config.headers.authorization = "Bearer " + getToken(); //设置请求头,把token放在请求头中
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

//响应拦截
instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export const get = (url, params) => instance.get(url, { params });
export const post = (url, params) => instance.post(url, params);
export default instance;
