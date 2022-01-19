import { admin } from 'utils';

export const getBlogList: any = async (params: any, token: any) => {
  try {
    const { data: blogs } = await admin(token ?? null).get(`/blog`, {
      params,
    });
    return blogs.data;
  } catch (err) {
    return null;
  }
};
