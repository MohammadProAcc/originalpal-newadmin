import { admin } from 'utils'

export const postPayment = async (order_id: string, form: any, token: string) => {
  try {
    const { data: stock_options } = await admin(token ?? null).post(`/admin/payments/${order_id}`, form)
    return stock_options
  } catch (err) {
    return false
  }
}
