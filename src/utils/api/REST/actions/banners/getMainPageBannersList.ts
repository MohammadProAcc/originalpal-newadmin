import { admin } from 'utils';

export const getMainPageBannersList: any = async (params: any, token: any) => {
  try {
    // const { data: banners } = await admin(token ?? null).post(`/banners/search`, {
    //   key: "type",
    //   type: "=",
    //   value: "slide"
    // }, {
    //   params
    // });
    const { data: banners } = await admin(token ?? null).get(`/banners`, {
      params,
    });
    return banners.data;
  } catch (err) {
    return null;
  }
};
