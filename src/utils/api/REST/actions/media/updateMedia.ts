import { admin } from 'utils/api/AdminApi'

export async function updateMedia(id: number, form: any) {
  try {
    const response = await admin().put(`/media/${id}`, form)
    return response
  } catch (err) {
    return null
  }
}
