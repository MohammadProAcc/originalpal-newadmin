import { admin } from 'utils';

export const createUser = async (form: any, token?: string) => {
  try {
    const { data: createdUser } = await admin(token).post(`/users`, form);
    return createdUser;
  } catch (err) {
    return null;
  }
};
