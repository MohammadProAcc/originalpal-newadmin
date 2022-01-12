import { initialUser, User } from 'types';

export interface LoginResponseUser {
  user: User;
  token: string;
}

export const initialLoginResponseUser = {
  user: initialUser,
  token: '',
};

export type Login = (form: { username: string; password: string }) => Promise<LoginResponseUser | null>;
