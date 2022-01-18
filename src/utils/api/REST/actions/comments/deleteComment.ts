import { admin } from 'utils';

export const deleteComment = async (commentsId: number, token?: string) => {
  try {
    const { data: deletedComment } = await admin(token).delete(`/comments/${commentsId}`);
    return deletedComment;
  } catch (err) {
    return null;
  }
};
