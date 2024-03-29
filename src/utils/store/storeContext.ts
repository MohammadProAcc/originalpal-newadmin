import { OrderInvoiceDetails } from 'components/PageComponents/Orders/types'
import produce from 'immer'
import { useMemo } from 'react'
import { initialLoginResponseUser, IOrder, LoginResponseUser, Media, Product, User, UserSlice } from 'types'
import { $_get_roles_list, reqSucceed } from 'utils'
import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { userActions } from './slices'

// Turn the set method into an immer proxy
const immer = (config: any) => (set: any, get: any, api: any) =>
  config(
    (partial: any, replace: any) => {
      const nextState = typeof partial === 'function' ? produce(partial) : partial
      return set(nextState, replace)
    },
    get,
    api,
  )

let store: any

// export interface InitialState extends UserSlice {}
export type InitialState = any

export const initialState: InitialState = {
  user: initialLoginResponseUser,
  cache: {},
  orderDetails: {
    description: '',
    postDescription: '',
    nextCoupon: '',
  },
}

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
        clearMainPageSectionList: (entity: string, itemId: number) =>
          set(
            (state: any) =>
              void (state[entity].data = state[entity]?.data.filter((item: any) => item?.id !== itemId)),
          ),
        clearMainPageSectionsList: (itemId: number) =>
          set(
            (state: any) =>
              void (state.mainPageSections.data = state?.mainPageSections?.data.filter(
                (item: any) => item?.id !== itemId,
              )),
          ),
        // --===>>> General <<<===--
        reload: (entity: string, value: any) =>
          set((state: any) => {
            state[entity] = value
          }),
        // --===>>> Order <<<===--
        clearOrderItems: (orderItemId: number) =>
          set(
            (state: any) =>
              void (state.order.order_items = state?.order?.order_items?.filter(
                (item: any) => item?.id !== orderItemId,
              )),
          ),
        setOrderDetails: (orderDetails: OrderInvoiceDetails) =>
          set((state: any) => void (state.orderDetails = orderDetails)),
        updateOrder: (order: IOrder) => set((state: any) => void (state.order = order)),
        // -===>>> Product <<<===-
        updateProduct: (product: Product) =>
          set((state: any) => {
            state.product = product
          }),
        updateProductAfterMediaRemoval: (removedMedia: Media) =>
          set(
            (state: any) =>
              void (state.product.media = state?.product?.media?.filter(
                (media: Media) => media?.u !== removedMedia?.u,
              )),
          ),
        // -==>>> comments <<<==-
        updateCommentCheck: (commentId: number, adminCheck: 0 | 1) =>
          set(
            (state: any) =>
              void (state.comments.data.data = state?.comments?.data?.data?.map((comment: any) =>
                comment?.id === commentId ? { ...comment, admin_check: adminCheck } : comment,
              )),
          ),
        updateComment: (comment: Comment) =>
          set((state: any) => {
            state.comment = comment
          }),
        // -==>>> users <<<==-
        updateUser: (user: User) =>
          set((state: any) => {
            state.user = user
          }),
        // -==>>> coupon <<<==-
        updateCoupon: (coupon: any) =>
          set((state: any) => {
            state.coupon = coupon
          }),
        // -==>>> roles <<<==-
        reloadRoles: async () => {
          const response = await $_get_roles_list();
          if (reqSucceed(response)) {
            set((state: any) => {
              state.roles = response;
            })
          }
        }
      })),
    ),
  )
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Zustand state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useHydrate(initialState: Partial<InitialState>) {
  const state = typeof initialState === 'string' ? JSON.parse(initialState) : initialState
  const store = useMemo(() => initializeStore(state), [state])
  return store
}
