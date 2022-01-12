import { admin } from 'utils';

export const getBannersList: any = async (params: any, token: any) => {
  try {
    const { data: banners } = await admin(token ?? null).get(`/banners`, {
      params,
    });
    return banners.data;
  } catch (err) {
    return null;
  }
};
