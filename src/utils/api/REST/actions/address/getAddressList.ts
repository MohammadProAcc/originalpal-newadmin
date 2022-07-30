import { admin } from 'utils'

export const getAddressList: any = async (params: any, token: any) => {
  try {
    const { data: address } = await admin(token ?? null).get(`/address`, {
      params,
    })
    return address.data
  } catch (err) {
    return null
  }
}
