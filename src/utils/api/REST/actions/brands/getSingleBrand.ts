import { admin } from 'utils';

export const getSingleBrand = async (brandId: string, token: string) => {
  try {
    const { data: brand } = await admin(token).get(`/brands/${brandId}`);
    return brand;
  } catch (err) {
    return null;
  }
};
