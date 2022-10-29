import { admin } from 'utils';

export const $_delete_role = async (body: Body, token?: string) => {
  try {
    const { data: deletedRole } = await admin(token).delete(`/roles/${body.role_id}`);
    return deletedRole;
  } catch (err) {
    return new Error("request failed");
  }
};

interface Body {
  role_id: number
}
