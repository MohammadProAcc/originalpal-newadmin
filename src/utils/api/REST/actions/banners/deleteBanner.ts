import { admin } from 'utils';

export const delete_banner = async (banner_id: number, token?: string) => {
  try {
    const { data } = await admin(token).delete(`${process.env.API}/admin/banners/${banner_id}`);
    return data;
  } catch (err) {
    return null;
  }
};
