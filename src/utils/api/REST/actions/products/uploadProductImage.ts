import { admin } from 'utils'

export const uploadProductImage = async (productId: number, type: 'media' | 'site_main_picture', file: File) => {
  const final = new FormData()
  final?.append(type, file)
  try {
    const response = await admin().post(`/product/${productId}/image`, final)
    console.log('success', response)
    return response
  } catch (err) {
    console.log('error', err)
    return null
  }
}
