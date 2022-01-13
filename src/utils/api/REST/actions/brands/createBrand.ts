import { admin } from 'utils';

export const createBrand = async (form: any, token?: string) => {
  try {
    const { data: createdBrand } = await admin(token).post(`/brands`, form);
    return createdBrand;
  } catch (err) {
    return null;
  }
};
