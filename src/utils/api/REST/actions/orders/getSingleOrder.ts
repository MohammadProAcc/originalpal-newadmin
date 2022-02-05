import { admin } from 'utils'

export const getSingleOrder = async (orderId: string, token?: string) => {
  try {
    const { data: order } = await admin(token).get(`/orders/${orderId}`)
    return order
  } catch (err) {
    return null
  }
}
