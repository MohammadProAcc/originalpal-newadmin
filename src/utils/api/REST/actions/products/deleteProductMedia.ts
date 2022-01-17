import { admin } from 'utils';

export const deleteProductMedia = async (product_id: string, u: string, token: string) => {
  try {
    const { data } = await admin(token ?? '').delete(`${process.env.API}/admin/products/${product_id}/media`, {
      data: {
        u,
      },
    });
    return data;
  } catch (err) {
    return err;
  }
};
