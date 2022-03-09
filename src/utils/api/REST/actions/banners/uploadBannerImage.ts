import { admin } from 'utils'

export const uploadBannerImage = async (bannerId: string, file: any, token?: string, video?: boolean) => {
  try {
    const { data: response } = await admin(token ?? '').post(
      video ? `/banners/image/${bannerId}?video=true` : `/banners/image/${bannerId}`,
      file,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    return response
  } catch (err) {
    return null
  }
}
