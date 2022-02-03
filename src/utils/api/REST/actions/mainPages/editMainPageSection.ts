import { admin } from 'utils'

export const editMainPageSection = async (mainPageId: number, form: any, token?: string) => {
  try {
    const { data: updatedMainPage } = await admin(token).put(`/main-page/sections/${mainPageId}`, form)
    return updatedMainPage
  } catch (err) {
    return null
  }
}
