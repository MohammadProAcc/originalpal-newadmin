import { admin } from 'utils'

export const createBanner = async (form: any, token: any) => {
  try {
    const { data } = await admin(token).post(`${process.env.API}/admin/banners`, form)
    return data
  } catch (err) {
    return null
  }
}
