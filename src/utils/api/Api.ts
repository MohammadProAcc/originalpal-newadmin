import axios from 'axios';
import Cookies from 'js-cookie'

export const api = (token?: string) => {
  const Axios = axios.create({
    baseURL: `${process.env.API}/api`,
  });

  Axios.interceptors.request.use((config) => {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: token ? `Bearer ${token}` : `Bearer ${Cookies.get(process.env.TOKEN!)}`,
      },
    }
  })

  return Axios;
};
