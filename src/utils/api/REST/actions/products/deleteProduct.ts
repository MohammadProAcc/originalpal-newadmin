import { admin } from 'utils';

export const deleteProduct: any = async (productId: any, token: any) => {
  try {
    const { data: deletedProduct } = await admin(token ?? null).delete(`/products/${productId}`);
    return deletedProduct.data;
  } catch (err) {
    return null;
  }
};
