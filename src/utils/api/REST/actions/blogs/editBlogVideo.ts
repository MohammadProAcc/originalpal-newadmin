import { admin } from "utils";

export const editBlogVideo = async (blogId: number, form: any) => {
  try {
    const { data: updatedBlog } = await admin().put(`/blogs/${blogId}/video`, form);
    return updatedBlog;
  } catch (err) {
    return null;
  }
};
