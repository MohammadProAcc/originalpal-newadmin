import { admin } from 'utils'

export const deleteProductVideo = async (product_id: string, u: string, token: string) => {
  try {
    const { data } = await admin(token ?? '').delete(`${process.env.API}/admin/products/${product_id}/video`, {
      data: {
        u,
      },
    })
    return data
  } catch (err) {
    return err
  }
}
