import { admin } from 'utils'

export const getSingleComment = async (commentId: string, token?: string) => {
  try {
    const { data: comment } = await admin(token).get(`/comments/${commentId}`)
    return comment
  } catch (err) {
    return null
  }
}
