import { admin } from 'utils';

export const deleteBlog = async (blogId: number, token?: string) => {
  try {
    const { data: deletedBlog } = await admin(token).delete(`/blog/${blogId}`);
    return deletedBlog;
  } catch (err) {
    return null;
  }
};
