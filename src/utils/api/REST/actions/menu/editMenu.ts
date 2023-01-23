import { admin } from 'utils'

export const editMenu = async (menuId: number, form: any, token?: string) => {
  try {
    const { data: updatedMenu } = await admin(token).put(`/menu/${menuId}`, form)
    return updatedMenu
  } catch (err) {
    return null
  }
}
