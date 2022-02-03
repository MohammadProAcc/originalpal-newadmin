import { admin } from 'utils'

export const deleteMainPageSection = async (mainPageId: number, token?: string) => {
  try {
    const { data: deletedMainPage } = await admin(token).delete(`/main-page/sections/${mainPageId}`)
    return deletedMainPage
  } catch (err) {
    return null
  }
}
