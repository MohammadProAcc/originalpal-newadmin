import axios from 'axios'
import Cookies from 'js-cookie'
import router from 'next/router'

export const admin = (token?: string) => {
  const Axios = axios.create({
    baseURL: `${process.env.API}/admin`,
  })

  Axios.interceptors.request.use((config) => {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: token ? `Bearer ${token}` : `Bearer ${Cookies.get('token')}`,
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
      console.log('>>>>> Axios Api >>>>> Error ', error)
    },
  )

  return Axios
}
