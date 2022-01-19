import { admin } from 'utils';

export const editBlog = async (blogId: number, form: any, token?: string) => {
  try {
    const { data: updatedBlog } = await admin(token).put(`/blog/${blogId}`, form);
    return updatedBlog;
  } catch (err) {
    return null;
  }
};
