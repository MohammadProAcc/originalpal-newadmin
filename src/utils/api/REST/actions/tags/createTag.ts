import { admin } from 'utils';

export const createTag = async (form: any, token?: string) => {
  try {
    const { data: createdTag } = await admin(token).post(`/tags`, form);
    return createdTag;
  } catch (err) {
    return null;
  }
};
