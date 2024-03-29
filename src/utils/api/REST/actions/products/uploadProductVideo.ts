import { admin } from 'utils'

export const uploadProductVideo = async (productId: number, file: File, token?: string) => {
  const final = new FormData()
  final?.append('video', file)
  try {
    const response = await admin(token).post(`/product/${productId}/image`, final)
    return response
  } catch (err) {
    return null
  }
}
