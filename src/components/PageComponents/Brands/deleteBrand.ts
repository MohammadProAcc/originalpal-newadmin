import { admin } from 'utils';

export const deleteBrand = async (brandId: number, token?: string) => {
  try {
    const { data: deletedBrand } = await admin(token).delete(`/brands/${brandId}`);
    return deletedBrand;
  } catch (err) {
    return null;
  }
};
