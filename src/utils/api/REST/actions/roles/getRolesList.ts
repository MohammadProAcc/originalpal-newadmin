import { admin } from 'utils';

export const $_get_roles_list: any = async (params: any, token: any) => {
  try {
    const { data: roles } = await admin(token ?? null).get(`/roles`, {
      params,
    });
    return roles.data;
  } catch (err) {
    return null;
  }
};
