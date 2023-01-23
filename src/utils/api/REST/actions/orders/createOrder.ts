import { IOrderForCreation } from 'types'
import { api } from 'utils'

export async function createOrder(order: IOrderForCreation) {
  const response = await api().post('/orders', order)
  return response
}
