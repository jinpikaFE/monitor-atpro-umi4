import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface RequestInterceptors {
  requestinterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig //请求拦截
  requestinterceptorCatch?: (error: any) => any //请求拦截失败
  responseinterceptor?: (config: AxiosResponse) => AxiosResponse // 相应拦截
  responseinterceptorCatch?: (error: any) => any //相应失败拦截
} //定义拦截器

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors
  headers?: any
  /** 直接返回res.data */
  returnData?: boolean
}

export interface ServerConfig {
  useToken?: boolean
}
