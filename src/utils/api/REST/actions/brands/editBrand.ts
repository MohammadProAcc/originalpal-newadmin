import { admin } from 'utils';

export const editBrand = async (brandId: number, form: any, token?: string) => {
  try {
    const { data: updatedBrand } = await admin(token).put(`/brands/${brandId}`, form);
    return updatedBrand;
  } catch (err) {
    return null;
  }
};
