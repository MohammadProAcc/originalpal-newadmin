import { admin } from 'utils'

export const getPayments: any = async (params: any, token: any) => {
  try {
    const { data: orders } = await admin(token ?? null).get(`/payments`, {
      params,
    })
    return orders.data
  } catch (err) {
    return null
  }
}
