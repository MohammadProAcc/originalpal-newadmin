import { admin } from 'utils';

export const getSingleCoupon = async (couponId: string, token: string) => {
  try {
    const { data: coupon } = await admin(token).get(`/coupons/${couponId}`);
    return coupon;
  } catch (err) {
    return null;
  }
};
