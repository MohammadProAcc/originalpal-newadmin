import { admin } from 'utils';

export const getSingleUser = async (userId: string, token: string) => {
  try {
    const { data: user } = await admin(token).get(`/users/${userId}`);
    return user;
  } catch (err) {
    return null;
  }
};
