import { admin } from 'utils'

export const editAddress: any = async (addressId: any, form: any, token: any) => {
  try {
    const { data: updatedAddress } = await admin(token ?? null).put(`/address/${addressId}`, form)
    return updatedAddress.data
  } catch (err) {
    return null
  }
}
