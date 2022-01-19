import { admin } from 'utils';

export const createCoupon = async (form: any, token?: string) => {
  try {
    const { data: createdCoupon } = await admin(token).post(`/coupons`, form);
    return createdCoupon;
  } catch (err) {
    return null;
  }
};
