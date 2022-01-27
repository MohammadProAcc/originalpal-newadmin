import { admin } from 'utils'

export const createMenu = async (form: any, token?: string) => {
  try {
    const { data: createdMenu } = await admin(token).post(`/menu`, form)
    return createdMenu
  } catch (err) {
    return null
  }
}
