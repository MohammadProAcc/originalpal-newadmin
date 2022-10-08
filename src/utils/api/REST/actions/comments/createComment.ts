import { client } from 'utils'

export const createComment = async (form: any, token?: string) => {
  try {
    const { data: createdComment } = await client(token).post(`/comments`, form)
    return createdComment
  } catch (err) {
    return null
  }
}
