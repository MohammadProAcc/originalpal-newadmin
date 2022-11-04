import { initialLoginResponseUser, LoginResponseUser } from 'types'
import create, { GetState, SetState, StoreApi, UseBoundStore } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

type UserStore = {
  user: any
  setUser: (user: any) => void
  getPermissions: () => string[]
}

export const useUserStore: UseBoundStore<UserStore> = create(
  persist(
    devtools<UserStore, SetState<UserStore>, GetState<UserStore>, StoreApi<UserStore>>(
      (set, get) => ({
        user: initialLoginResponseUser,
        setUser: (user: LoginResponseUser | null) =>
          set((state: any) => void (state.user = user ?? initialLoginResponseUser)),
        getPermissions: () => {
          return Array.from(new Set((get() as any).user!.user!.roles?.map((_role: any) => _role.permissions).flat()))
        },
      }),
      {
        name: 'user-store',
      },
    ),
    {
      name: 'user-store',
    },
  ),
)
