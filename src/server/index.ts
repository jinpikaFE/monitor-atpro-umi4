import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import type { RequestInterceptors, RequestConfig } from './interface';
import { message } from 'antd';
import { storage } from '@/utils/Storage';

class Server {
  instance: AxiosInstance;
  interceptors?: RequestInterceptors;
  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;

    this.instance.interceptors.request.use(
      this.interceptors?.requestinterceptor,
      this.interceptors?.requestinterceptorCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseinterceptor,
      this.interceptors?.responseinterceptorCatch,
    );

    // 添加所有实例都有的拦截器
    // this.instance.interceptors.request.use(
    //   (config) => {
    //     console.log(config)
    //     return config
    //   },
    //   (err) => {
    //     return err
    //   }
    // )
  }
  request<T = any>(config: RequestConfig): Promise<T> {
    message.loading({
      content: '加载中',
      duration: 0,
      key: 'globalLoading',
    });
    return this.instance.request(config);
  }
}

const server = new Server({
  baseURL: process.env.REACT_BASE_URL,
  timeout: 20000,
  interceptors: {
    requestinterceptor: (config: InternalAxiosRequestConfig) => {
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      config.headers['Content-Type'] ||= 'application/json';
      if (storage.get('token')) {
        config.headers.authorization = 'Bearer ' + storage.get('token');
      }
      return config;
    },
    requestinterceptorCatch: (err) => {
      console.log('请求失败的拦截');
      console.log(err);
      message.destroy();
      return err;
    },
    responseinterceptor: (res: any) => {
      // 是否全部返回
      message.destroy();
      // 判断返回data还是data.data
      const returnData = res.config?.returnData;
      if (!returnData) {
        if (res.data.code === 200) {
          return res.data;
        } else {
          message.error(res?.data?.msg || res?.data?.message);
          return Promise.reject(res.data);
        }
      } else {
        if (res.data.code === 200) {
          return res.data.data;
        } else {
          // data.code非200  提示报错并reject error
          message.error(res?.data?.msg || res?.data?.message);
          return Promise.reject(res.data);
        }
      }
    },
    responseinterceptorCatch: (err) => {
      message.destroy();
      const code = err?.response?.status;
      if (code === 401) {
        storage.clear();
        window.location.href = `${location.origin}`;
        message.error('用户没有权限');
      } else if (code === 400) {
        message.error('请求出错');
      } else if (code === 403) {
        message.error('用户得到授权，但是访问被禁止!');
      } else if (code === 404) {
        message.error('网络请求错误,未找到该资源!');
      } else if (code === 405) {
        message.error('网络请求错误,请求方法未允许!');
      } else if (code === 408) {
        message.error('网络请求超时!');
      } else if (code === 500) {
        message.error('服务器错误,请联系管理员!');
      } else if (code === 501) {
        message.error('网络错误!');
      } else if (code === 502) {
        message.error('网络错误!');
      } else if (code === 503) {
        message.error('服务不可用，服务器暂时过载或维护!');
      } else if (code === 504) {
        message.error('网络超时!');
      } else if (code === 505) {
        message.error('http版本不支持该请求!');
      } else {
        message.error(err.message);
      }
      return Promise.reject(err);
    },
  },
});
export default server;
