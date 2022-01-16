import { admin } from 'utils';

export const createProduct: any = async (form: any, token: any) => {
  try {
    const { data: product } = await admin(token ?? null).post(`/products`, form);
    return product.data;
  } catch (err) {
    return null;
  }
};
