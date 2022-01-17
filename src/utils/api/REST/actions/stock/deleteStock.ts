import { admin } from 'utils';

export const deleteStock: any = async (stockId: any, token: any) => {
  try {
    const { data: deletedStock } = await admin(token ?? null).delete(`/stock/${stockId}`);
    return deletedStock;
  } catch (err) {
    return null;
  }
};
