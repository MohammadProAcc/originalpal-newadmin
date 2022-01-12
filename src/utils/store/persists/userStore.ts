import { initialLoginResponseUser, LoginResponseUser } from 'types';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
  user: LoginResponseUser;
  setUser: (user: LoginResponseUser) => void;
};

export const useUserStore = create(
  persist(
    (set) => ({
      user: initialLoginResponseUser,
      setUser: (user: LoginResponseUser | null) =>
        set((state: any) => void (state.user = user ?? initialLoginResponseUser)),
    }),
    {
      name: 'user-store',
    },
  ),
);
