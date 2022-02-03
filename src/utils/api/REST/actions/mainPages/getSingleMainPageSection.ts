import { admin } from 'utils'

export const getSingleMainPageSection = async (mainPageId: string, token: string) => {
  try {
    const { data: mainPage } = await admin(token).get(`/main-page/sections/${mainPageId}`)
    return mainPage
  } catch (err) {
    return null
  }
}
