import { admin } from 'utils';

export const getSingleStock = async (stockId: any, token: any) => {
  try {
    const { data: stock } = await admin(token ?? null).get(`/stock/${stockId}`);
    return stock.data;
  } catch (err) {
    return null;
  }
};
