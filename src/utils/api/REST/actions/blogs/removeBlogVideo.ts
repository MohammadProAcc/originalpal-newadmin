import { admin } from "utils";

export async function $_remove_blog_video(blogId: string, u: string) {
  try {
    const response = await admin().post(`/blogs/${blogId}/video/delete`, {
      u,
    });
    return response;
  } catch (err: any) {
    return new Error(err);
  }
}
