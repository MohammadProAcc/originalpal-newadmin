import { LoginResponseUser, UserActions } from 'types';

export interface UserSlice extends UserActions {
  user: LoginResponseUser;
}

export * from './actions';
