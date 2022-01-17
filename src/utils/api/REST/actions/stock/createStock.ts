import { admin } from 'utils';

export const createStock: any = async (form: any, token: any) => {
  try {
    const { data: stock } = await admin(token ?? null).post(`/stocks`, form);
    return stock;
  } catch (err) {
    return null;
  }
};
