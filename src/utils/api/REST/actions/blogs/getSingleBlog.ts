import { admin } from "utils";

export const getSingleBlog = async (blogId: string, token?: string) => {
  try {
    const data = await admin(token).get(`/blog/${blogId}`);
    return data.data;
  } catch (err) {
    return null;
  }
};
