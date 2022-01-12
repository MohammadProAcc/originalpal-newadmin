import { admin } from 'utils';

export const getCouponsList: any = async (params: any, token: any) => {
  try {
    const { data: coupons } = await admin(token ?? null).get(`/coupons`, {
      params,
    });
    return coupons.data;
  } catch (err) {
    return null;
  }
};
