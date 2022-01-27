import { admin } from 'utils'

export const deleteMenu = async (menuId: number, token?: string) => {
  try {
    const { data: deletedMenu } = await admin(token).delete(`/menu/${menuId}`)
    return deletedMenu
  } catch (err) {
    return null
  }
}
