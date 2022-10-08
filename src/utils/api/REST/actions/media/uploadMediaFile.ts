import { admin } from 'utils/api/AdminApi'

export async function uploadMediaFile(file: File) {
  const formData = new FormData()
  formData.append('media', file)
  try {
    const response = await admin().post('/media', formData)
    return response
  } catch (err) {
    return null
  }
}
