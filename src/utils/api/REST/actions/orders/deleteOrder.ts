import { admin } from 'utils';

export const deleteOrder = async (orderId: string, token?: string) => {
  try {
    const { data: response } = await admin(token).delete(`/orders/${orderId}`);
    return response;
  } catch (err) {
    return null;
  }
};
