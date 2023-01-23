import { Stock } from 'types';
import { admin } from 'utils';

export async function getSingleStock(stockId: any, token?: any): Promise<Stock | null> {
  try {
    const { data: stock } = await admin(token ?? null).get(`/stock/${stockId}`);
    return stock.data;
  } catch (err) {
    return null;
  }
};
