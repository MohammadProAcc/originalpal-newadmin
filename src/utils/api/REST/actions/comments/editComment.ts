import { admin } from 'utils';

export const editComment = async (commentId: number, form: any, token?: string) => {
  try {
    const { data: updatedComment } = await admin(token).put(`/comments/${commentId}`, form);
    return updatedComment;
  } catch (err) {
    return null;
  }
};
