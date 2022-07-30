import { admin } from 'utils'

export const deleteAddress: any = async (addressId: any, token: any) => {
  try {
    const { data: deletedAddress } = await admin(token ?? null).delete(`/address/${addressId}`)
    return deletedAddress
  } catch (err) {
    return null
  }
}
