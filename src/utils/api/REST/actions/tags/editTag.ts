import { admin } from 'utils';

export const editTag = async (tagId: number, form: any, token?: string) => {
  try {
    const { data: updatedTag } = await admin(token).put(`/tags/${tagId}`, form);
    return updatedTag;
  } catch (err) {
    return null;
  }
};
