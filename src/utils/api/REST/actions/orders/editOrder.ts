import { admin } from 'utils'

export const editOrder = async (orderId: number, form: any) => {
  try {
    const { data: response } = await admin().put(`/orders/${orderId}`, form)
    return response
  } catch (err) {
    return null
  }
}
