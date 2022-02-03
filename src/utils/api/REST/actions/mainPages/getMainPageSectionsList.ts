import { admin } from 'utils'

export const getMainPageSectionsList: any = async (params: any, token: any) => {
  try {
    const { data: mainPages } = await admin(token ?? null).get(`/main-page/sections`, {
      params,
    })
    return mainPages.data
  } catch (err) {
    return null
  }
}
