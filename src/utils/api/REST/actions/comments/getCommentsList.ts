import { admin } from 'utils';

export const getCommentsList: any = async (params: any, token: any) => {
  try {
    const { data: comments } = await admin(token ?? null).get(`/comments`, {
      params,
    });
    return comments.data;
  } catch (err) {
    return null;
  }
};
