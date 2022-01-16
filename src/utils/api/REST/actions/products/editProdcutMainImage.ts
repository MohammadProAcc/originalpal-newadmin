import { admin } from 'utils';

export const editProductMainImage: any = async (productId: any, form: any, token: any) => {
  try {
    const { data: updatedProduct } = await admin(token ?? null).put(`/products/${productId}/main_image`, form);
    return updatedProduct;
  } catch (err) {
    return null;
  }
};
