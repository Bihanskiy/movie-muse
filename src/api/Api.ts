
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import AppConfig from './config';

const api: AxiosInstance = axios.create({
  baseURL: AppConfig.baseURL,
});

const responseSuccessInterceptor = (response: AxiosResponse) => {
  const data = response.data;

  if (data?.Error) {
    return { error: data.Error } as unknown as AxiosResponse;
  }

  return { data: data } as AxiosResponse;
};

const errorInterceptor = (error: AxiosError) => {
  const responseError = error?.response?.data;
  return { error: responseError || error };
};

api.interceptors.response.use(responseSuccessInterceptor, errorInterceptor);


export default api;