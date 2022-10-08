import { admin } from 'utils'

export const getMedia: any = async (mediaId?: number, token?: string) => {
  try {
    const { data: media } = await admin(token).get(`/media/${mediaId}`)
    return media
  } catch (err) {
    return null
  }
}
