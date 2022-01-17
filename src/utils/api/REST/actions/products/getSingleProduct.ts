import { admin } from 'utils';

export const getSingleProduct = async (productId: any, token: any) => {
  try {
    const { data: product } = await admin(token ?? null).get(`/products/${productId}`);
    return product.data;
  } catch (err) {
    return null;
  }
};
