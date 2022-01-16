import { admin } from 'utils';

export const getSingleTag = async (tagId: string, token: string) => {
  try {
    const { data: tag } = await admin(token).get(`/tags/${tagId}`);
    return tag;
  } catch (err) {
    return null;
  }
};
