import { admin } from 'utils';

export const getUsersList: any = async (params: any, token: any) => {
  try {
    const { data: users } = await admin(token ?? null).get(`/users`, {
      params,
    });
    return users.data;
  } catch (err) {
    return null;
  }
};
