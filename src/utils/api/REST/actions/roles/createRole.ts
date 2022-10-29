import { Roles } from 'types';
import { admin } from 'utils';

export const $_create_role = async (form: Form, token?: string) => {
  try {
    const { data: createdRole } = await admin(token).post(`/roles`, form);
    return createdRole;
  } catch (err) {
    return new Error("request failed");
  }
};

interface Form {
  name: string,
  permissions: Roles[]
}
