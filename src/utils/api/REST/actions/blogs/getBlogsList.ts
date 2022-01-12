import { admin } from 'utils';

export const getBlogsList: any = async (params: any, token: any) => {
  try {
    const { data: blogs } = await admin(token ?? null).get(`/blogs`, {
      params,
    });
    return blogs.data;
  } catch (err) {
    return null;
  }
};
