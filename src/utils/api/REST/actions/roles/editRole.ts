import { Roles } from 'types';
import { admin } from 'utils';

export const $_edit_role = async (body: Body) => {
  try {
    const { data: editdRole } = await admin(body.token).put(`/roles/${body.id}`, body.form);
    return editdRole;
  } catch (err) {
    return new Error("request failed");
  }
};

interface Body {
  id: number,
  form: {
    name: string,
    permissions: Roles[]
  },
  token?: string
}
