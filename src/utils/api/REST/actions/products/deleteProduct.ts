import { admin } from 'utils'

export const deleteProduct: any = async (productId: any, token: any) => {
  console.log('Product Id >>> ', productId)
  try {
    const { data: deletedProduct } = await admin(token ?? null).delete(`/products/${productId}`)
    return deletedProduct
  } catch (err) {
    console.log(err)
    return null
  }
}
