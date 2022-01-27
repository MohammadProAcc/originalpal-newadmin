import { admin } from 'utils'

export const getSingleBlog = async (blogId: string, token?: string) => {
  try {
    const { data: blog } = await admin(token).get(`/blog/${blogId}`)
    return blog
  } catch (err) {
    return null
  }
}
