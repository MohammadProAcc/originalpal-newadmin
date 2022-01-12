import { LoginResponseUser } from 'types';

export type SetUser = {
  setUser: (user: LoginResponseUser) => void;
};
