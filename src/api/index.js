import axios from 'axios';
import * as channel from './channel.js';

const _default = function(token) {
  function BKSKD(token) {
    this.token = token;
    // this.axios = axios;
    this.axios = axios.create({
      // baseUrl:'http://localhost:8080' //请求后端数据的基本地址，自定义
      timeout: 5000 //请求超时设置，单位ms
    });
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return {
      ...this,
      ...channel,
    };
  }

  return new BKSKD(token);
};

export default _default
