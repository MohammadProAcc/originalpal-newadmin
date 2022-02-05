import { admin } from 'utils'

export const editOrderAddress = async (orderId: number, addressId: number, form: any) => {
  try {
    const { data: response } = await admin().put(`/orders/${orderId}/address/${addressId}`, form)
    return response
  } catch (err) {
    return null
  }
}
