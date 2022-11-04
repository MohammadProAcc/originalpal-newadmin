import { OrdersPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getOrdersList } from 'utils'

const Orders: NextPage = () => <OrdersPage />

export default Orders

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!(await asyncHas(PermissionEnum.browseOrder, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const orders = await getOrdersList(context?.query, context?.req?.cookies?.[process.env.TOKEN!])

    return {
      props: {
        initialState: {
          orders,
        },
      },
    }
  } else {
    return {
      props: {},
      redirect: {
        destination: '/auth/login',
      },
    }
  }
}
