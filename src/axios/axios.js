/*
 * @Author: lxiang
 * @Date: 2022-05-30 19:12:30
 * @LastEditors: lxiang
 * @LastEditTime: 2022-05-31 10:52:20
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\axios\axios.js
 */
import axios from "axios";

// 从localStorage中获取token
function getLocalToken() {
  const token = window.localStorage.getItem("token");
  return token;
}

function refreshToken() {
  // instance是当前request.js中已创建的axios实例
  return instance.post("/api/login").then((res) => res.data);
}

// 创建一个axios实例
const instance = axios.create({
  baseURL: "/",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
    token: getLocalToken(), // headers塞token
  },
});

// 给实例添加一个setToken方法，用于登录后将最新token动态添加到header，同时将token保存在localStorage中
instance.setToken = (token) => {
  instance.defaults.headers["token"] = token;
  window.localStorage.setItem("token", token);
};

// 退出或注销后，删除token
instance.removeToken = () => {
  instance.defaults.headers["token"] = null;
  window.localStorage.removeItem("token");
};

// 是否正在刷新的标记
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests = [];

instance.interceptors.response.use(
  (response) => {
    const { code } = response.data;
    if (code === 1234) {
      const config = response.config;
      if (!isRefreshing) {
        isRefreshing = true;
        return refreshToken()
          .then((res) => {
            const { token } = res.data;
            instance.setToken(token);
            config.headers["token"] = token;
            config.baseURL = "";
            // 已经刷新了token，将所有队列中的请求进行重试
            requests.forEach((cb) => cb(token));
            requests = [];
            return instance(config);
          })
          .catch((res) => {
            console.error("refreshtoken error =>", res);
            window.location.href = "/";
          })
          .finally(() => {
            isRefreshing = false;
          });
      } else {
        // 正在刷新token，将返回一个未执行resolve的promise
        return new Promise((resolve) => {
          // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
          requests.push((token) => {
            config.baseURL = "";
            config.headers["token"] = token;
            resolve(instance(config));
          });
        });
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
