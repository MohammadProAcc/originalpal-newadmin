import { admin } from 'utils'
export const getAllBrands = async (token?: string) => {
  try {
    const brands = await admin(token).get(`/brands/list`)
    return brands
  } catch (err) {
    return null
  }
}
