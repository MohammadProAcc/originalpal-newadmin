import { admin } from 'utils';

export const editCoupon = async (couponId: number, form: any, token?: string) => {
  try {
    const { data: updatedCoupon } = await admin(token).put(`/coupons/${couponId}`, form);
    return updatedCoupon;
  } catch (err) {
    return null;
  }
};
