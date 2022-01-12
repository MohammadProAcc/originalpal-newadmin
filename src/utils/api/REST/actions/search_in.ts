import { admin } from 'utils';

export const search_in = async (entity: string, form: any, params: any, token?: string, url?: string) => {
  try {
    const { data } = await admin(token).post(url ?? `${process.env.API}/admin/${entity}/search`, form, {
      params,
    });
    return data;
  } catch (err) {
    return null;
  }
};
