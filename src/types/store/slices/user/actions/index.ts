import { SetState } from 'zustand';
import { InitialState } from 'utils';
import { SetUser } from './SetUser';

export interface UserActions extends SetUser {}

export type UserActionsGenerator = (set: SetState<InitialState>) => UserActions;

export * from './SetUser';
