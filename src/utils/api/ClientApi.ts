import axios from 'axios'
import Cookies from 'js-cookie'
import router from 'next/router'

export const client = (token?: string) => {
  const Axios = axios.create({
    baseURL: `${process.env.API}/api`,
  })

  Axios.interceptors.request.use((config) => {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: token ? `Bearer ${token}` : `Bearer ${Cookies.get(process.env.TOKEN!)}`,
      },
    }
  })

  Axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.status === 401) {
        Cookies.remove('token')
        router.push('/auth/login')
      }
    },
  )

  return Axios
}
