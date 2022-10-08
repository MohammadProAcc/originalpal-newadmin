import { admin } from 'utils'

export const getMediaList: any = async (page?: number, token?: string) => {
  try {
    const { data: medias } = await admin(token).get(`/media`, {
      params: {
        page,
      },
    })
    return medias
  } catch (err) {
    return null
  }
}
