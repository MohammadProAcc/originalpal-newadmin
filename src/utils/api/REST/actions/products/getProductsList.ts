import { admin } from 'utils';

export const getProductsList: any = async (params: any, token: any) => {
  try {
    const { data: products } = await admin(token ?? null).get(`/products`, {
      params,
    });
    return products.data;
  } catch (err) {
    return null;
  }
};
