import { admin } from 'utils';

export const deleteCoupon = async (couponsId: number, token?: string) => {
  try {
    const { data: deletedCoupon } = await admin(token).delete(`/coupons/${couponsId}`);
    return deletedCoupon;
  } catch (err) {
    return null;
  }
};
