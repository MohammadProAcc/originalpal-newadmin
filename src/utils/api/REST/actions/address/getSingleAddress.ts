import { admin } from 'utils'

export const getSingleAddress = async (addressId: any, token: any) => {
  try {
    const { data: address } = await admin(token ?? null).get(`/address/${addressId}`)

    return address
  } catch (err) {
    return null
  }
}
