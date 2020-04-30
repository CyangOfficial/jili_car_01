//axios
import Vue from "vue";
import router from './router'
const axios = require('axios');
const http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
});


//请求拦截器
http.interceptors.request.use(config => {
  //为所有的请求添加 请求头 Authorization 把token发送给服务端
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + (localStorage.token || '');
  }
  return config;
}, err => {
  return Promise.reject(err);
});

//响应拦截器
http.interceptors.response.use(res => {
  return res;
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message.error(err.response.data.message);
  }
  console.log(err.response.status)
  if(err.response.status === 401){
    console.log('login')
    router.push('/registerorsginIn/login');
  }

  return Promise.reject(err);
});



export default http;

