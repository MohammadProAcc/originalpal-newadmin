import { admin } from 'utils';

export const notifyOnStock = async (productId: string, token: string) => {
  try {
    const { data: response } = await admin(token ?? '').post(`/products/${productId}/notify-on-stock`);
    return response;
  } catch (err) {
    return null;
  }
};
