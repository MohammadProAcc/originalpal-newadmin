import { admin } from 'utils'

export const editMenu = async (menuId: number, form: any, token?: string) => {
  try {
    const { data: updatedMenu } = await admin(token).put(`/menu/${menuId}`, form)
    console.log(updatedMenu)
    return updatedMenu
  } catch (err) {
    console.log(err)
    return null
  }
}
