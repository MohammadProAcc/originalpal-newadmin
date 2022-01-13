import produce from 'immer';
import { useMemo } from 'react';
import { initialLoginResponseUser, LoginResponseUser, UserSlice } from 'types';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { userActions } from './slices';

// Turn the set method into an immer proxy
const immer = (config: any) => (set: any, get: any, api: any) =>
  config(
    (partial: any, replace: any) => {
      const nextState = typeof partial === 'function' ? produce(partial) : partial;
      return set(nextState, replace);
    },
    get,
    api,
  );

let store: any;

// export interface InitialState extends UserSlice {}
export type InitialState = any;

export const initialState: InitialState = {
  user: initialLoginResponseUser,
  cache: {},
};

function initStore(preloadedState = initialState) {
  return create(
    devtools(
      immer((set: any, get: any) => ({
        ...initialState,
        ...preloadedState,
        ...userActions(set),
        // --===>>> Cache System <<<===--
        setCache: (key: string, value: any) => set((state: any) => void (state.cache[key] = value)),
        restoreCache: (key: string) => get((state: any) => state?.cache[key]),
        clearList: (entity: string, itemId: number) =>
          set(
            (state: any) =>
              void (state[entity].data.data = state[entity]?.data.data.filter((item: any) => item?.id !== itemId)),
          ),
      })),
    ),
  );
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Zustand state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useHydrate(initialState: Partial<InitialState>) {
  const state = typeof initialState === 'string' ? JSON.parse(initialState) : initialState;
  const store = useMemo(() => initializeStore(state), [state]);
  return store;
}
