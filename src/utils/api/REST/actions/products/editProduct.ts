import { admin } from 'utils';

export const editProduct: any = async (productId: any, form: any, token: any) => {
  try {
    const { data: updatedProduct } = await admin(token ?? null).put(`/products/${productId}`, form);
    return updatedProduct.data;
  } catch (err) {
    return null;
  }
};
