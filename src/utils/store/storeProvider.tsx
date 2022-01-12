import React from 'react';
import { createContext, useContext } from 'react';
import { initialState, InitialState } from '.';

// FIXME: Check the any
export const StoreContext = createContext<any>(initialState);

// TODO: add store types
export const StoreProvider = ({ children, store }: { children: any; store: InitialState }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export type UseStore = (selector?: ({}: InitialState) => Partial<InitialState>, eqFn?: any) => Partial<InitialState>;

export const useStore: UseStore = (selector, eqFn) => {
  const store = useContext(StoreContext);
  const values = store(selector, eqFn);
  return values;
};
