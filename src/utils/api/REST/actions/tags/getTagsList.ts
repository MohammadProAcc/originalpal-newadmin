import { admin } from 'utils';

export const getTagsList: any = async (params: any, token: any) => {
  try {
    const { data: tags } = await admin(token ?? null).get(`/tags`, {
      params,
    });
    return tags.data;
  } catch (err) {
    return null;
  }
};
