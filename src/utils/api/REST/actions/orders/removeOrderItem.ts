import { admin } from 'utils';

export const removeOrderItem = async (orderItemId: number) => {
  try {
    const { data: response } = await admin().delete(`/orders/order-item/${orderItemId}`);
    return response;
  } catch (err) {
    return null;
  }
};
