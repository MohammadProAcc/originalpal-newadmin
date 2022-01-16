import { admin } from 'utils';

export const editProductImage: any = async (productId: any, form: any, token: any) => {
  try {
    const { data: updatedProduct } = await admin(token ?? null).put(`/products/${productId}/media`, form);
    return updatedProduct;
  } catch (err) {
    return null;
  }
};
