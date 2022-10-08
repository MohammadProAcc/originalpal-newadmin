import { admin } from 'utils'

export const editProductVideo: any = async (productId: any, form: any, token: any) => {
  try {
    const { data: updatedProduct } = await admin(token ?? null).put(`/products/${productId}/video`, form)
    return updatedProduct
  } catch (err) {
    return null
  }
}
