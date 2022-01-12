import { admin } from 'utils';

export const getSingleBanner = async (bannerId: string, token?: string) => {
  try {
    const { data: banner } = await admin(token).get(`/banners/${bannerId}`);
    console.log();
    return banner;
  } catch (err) {
    console.log(err);
    return null;
  }
};
