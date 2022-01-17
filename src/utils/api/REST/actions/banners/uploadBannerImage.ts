import { admin } from 'utils';

export const uploadBannerImage = async (bannerId: string, form: any, token?: string) => {
  try {
    const { data: response } = await admin(token ?? '').post(`/banners/image/${bannerId}`, form);
    console.log(response);
    return response;
  } catch (err) {
    return null;
  }
};
