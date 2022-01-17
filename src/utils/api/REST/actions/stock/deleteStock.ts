import { admin } from 'utils';

export const deleteStock: any = async (stockId: any, token: any) => {
  try {
    const { data: deletedStock } = await admin(token ?? null).delete(`/stocks/${stockId}`);
    return deletedStock.data;
  } catch (err) {
    return null;
  }
};
