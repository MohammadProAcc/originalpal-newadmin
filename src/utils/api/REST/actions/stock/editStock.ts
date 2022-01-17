import { admin } from 'utils';

export const editStock: any = async (stockId: any, form: any, token: any) => {
  try {
    const { data: updatedStock } = await admin(token ?? null).put(`/stocks/${stockId}`, form);
    return updatedStock.data;
  } catch (err) {
    return null;
  }
};
