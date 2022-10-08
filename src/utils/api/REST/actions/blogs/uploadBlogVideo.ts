import { admin } from 'utils'

export const uploadBlogVideo = async (blogId: number, file: File) => {
  const formData = new FormData()
  formData?.append('blog_video', file)

  try {
    const { data: response } = await admin().post(`/blogs/${blogId}/video`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response
  } catch (err) {
    return null
  }
}
