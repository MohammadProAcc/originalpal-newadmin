import { admin } from 'utils';

export const deleteUser = async (usersId: number, token?: string) => {
  try {
    const { data: deletedUser } = await admin(token).delete(`/users/${usersId}`);
    return deletedUser;
  } catch (err) {
    return null;
  }
};
