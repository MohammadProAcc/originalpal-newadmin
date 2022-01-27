import { admin } from 'utils'

export const getSingleMenu = async (menuId: string, token?: string) => {
  try {
    const { data: menu } = await admin(token).get(`/menu/${menuId}`)
    return menu
  } catch (err) {
    return null
  }
}
