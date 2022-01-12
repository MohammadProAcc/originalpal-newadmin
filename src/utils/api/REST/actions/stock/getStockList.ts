import { admin } from 'utils';

export const getStocksList: any = async (params: any, token: any) => {
  try {
    const { data: stock } = await admin(token ?? null).get(`/stock`, {
      params,
    });
    return stock.data;
  } catch (err) {
    return null;
  }
};
