import { ActionType, initialLoginResponseUser, SetUser } from 'types';

export const setUserAction: ActionType<SetUser> = (set) => ({
  setUser: (user) => set((state: any) => void (state.user = user ? user : initialLoginResponseUser)),
});
