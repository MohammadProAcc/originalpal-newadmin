import { admin } from 'utils';

export const editUser = async (userId: number, form: any, token?: string) => {
  try {
    const { data: updatedUser } = await admin(token).put(`/users/${userId}`, form);
    return updatedUser;
  } catch (err) {
    return null;
  }
};
