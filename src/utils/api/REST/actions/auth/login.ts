import { Login } from 'types'
import { api } from 'utils'

export const login: Login = async (form: { username: string; password: string }) => {
  try {
    const { data: user } = await api().post(`/login`, form)
    return user.data
  } catch (err) {
    return null
  }
}
