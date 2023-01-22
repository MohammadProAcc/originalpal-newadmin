import { admin } from 'utils'

export const editProduct: any = async (productId: any, form: any, token: any) => {
  try {
    const { data: response } = await admin(token ?? null).put(`/products/${productId}`, form)
    return response
  } catch (err) {
    return null
  }
}
