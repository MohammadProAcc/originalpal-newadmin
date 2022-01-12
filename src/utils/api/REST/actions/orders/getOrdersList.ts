import { admin } from 'utils';

export const getOrdersList: any = async (params: any, token: any) => {
  try {
    const { data: orders } = await admin(token ?? null).get(`/orders`, {
      params,
    });
    return orders.data;
  } catch (err) {
    return null;
  }
};
