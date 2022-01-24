import { admin } from 'utils'

export const uploadBannerImage = async (bannerId: string, file: any, token?: string) => {
  try {
    const { data: response } = await admin(token ?? '').post(`/banners/image/${bannerId}`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response
  } catch (err) {
    return null
  }
}
