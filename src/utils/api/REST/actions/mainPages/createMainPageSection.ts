import { admin } from 'utils'

export const createMainPageSection = async (form: any, token?: string) => {
  try {
    const { data: createdMainPage } = await admin(token).post(`/main-page/sections`, form)
    return createdMainPage
  } catch (err) {
    return null
  }
}
