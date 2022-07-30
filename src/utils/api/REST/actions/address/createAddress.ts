import { admin } from 'utils'

export const createAddress: any = async (form: any, token: any) => {
  try {
    const { data: address } = await admin(token ?? null).post(`/address`, form)
    return address
  } catch (err) {
    return null
  }
}
