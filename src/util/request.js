import axios from "axios";
import "nprogress/nprogress.css";
import nprogress from "nprogress";
import { getToken } from "./auth";
const instance = axios.create({
  baseURL: "http://localhost:3009",
  timeout: 1000,
});

//全局请求拦截,网络发起之前，我们可以设置我们需要的自定义的数据请求
// 比如请求头中加token
instance.interceptors.request.use(
  function(config) {
    nprogress.start();
    if (getToken()) {
      config.headers.authorization = "Bearer " + getToken(); //设置请求头,把token放在请求头中
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

//全局响应拦截，处理请求结果和状态码
instance.interceptors.response.use(
  function(response) {
    nprogress.done();
    return response;
  },
  function(error) {
    nprogress.done();
    if (error.response && error.response.status == 401) {
      window.location.href = "/#/login";
    }
    return Promise.reject(error);
  }
);

export const get = (url, params) => instance.get(url, { params });
export const post = (url, params) => instance.post(url, params);
export const put = (url, params) => instance.put(url, params);
export const delet = (url, params) => instance.delete(url, { params });
export default instance;
