import { admin } from 'utils';

export const createBlog = async (form: any, token?: string) => {
  try {
    const { data: createdBlog } = await admin(token).post(`/blog`, form);
    return createdBlog;
  } catch (err) {
    return null;
  }
};
