import { admin } from 'utils';

export const deleteTag = async (tagsId: number, token?: string) => {
  try {
    const { data: deletedTag } = await admin(token).delete(`/tags/${tagsId}`);
    return deletedTag;
  } catch (err) {
    return null;
  }
};
