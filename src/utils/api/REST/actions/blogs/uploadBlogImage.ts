import { admin } from 'utils'

export const uploadBlogImage = async (blogId: number, source: 'thumb' | 'endimage', file: File) => {
  const formData = new FormData()
  formData?.append('source', source)
  formData?.append('file', file)

  try {
    const { data: response } = await admin().post(`/blogs/image/${blogId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response
  } catch (err) {
    return null
  }
}
