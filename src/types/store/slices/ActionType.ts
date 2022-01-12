import { InitialState } from 'utils';
import { SetState } from 'zustand';

export type ActionType<T> = (set: SetState<InitialState>) => T;
