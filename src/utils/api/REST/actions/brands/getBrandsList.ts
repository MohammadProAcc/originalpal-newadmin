import { admin } from 'utils';

export const getBrandsList: any = async (params: any, token: any) => {
  try {
    const { data: brands } = await admin(token ?? null).get(`/brands`, {
      params,
    });
    return brands.data;
  } catch (err) {
    return null;
  }
};
