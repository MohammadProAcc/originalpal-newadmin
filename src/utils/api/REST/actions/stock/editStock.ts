import { admin } from 'utils';

export const editStock: any = async (stockId: any, form: any, token: any) => {
  try {
    const { data: updatedStock } = await admin(token ?? null).put(`/stock/${stockId}`, form);
    return updatedStock.data;
  } catch (err) {
    return null;
  }
};
