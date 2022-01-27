import { admin } from 'utils'

export const getMenusList: any = async (params: any, token: any) => {
  try {
    const { data: menu } = await admin(token ?? null).get(`/menu`, {
      params,
    })
    return menu.data
  } catch (err) {
    return null
  }
}
