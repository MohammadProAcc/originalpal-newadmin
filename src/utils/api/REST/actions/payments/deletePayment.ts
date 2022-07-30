import { admin } from 'utils'

export const deletePayment = async (orderId: string, token?: string) => {
  try {
    const { data: response } = await admin(token).delete(`/payments/${orderId}`)
    return response
  } catch (err) {
    return null
  }
}
