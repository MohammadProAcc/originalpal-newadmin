import { OrderInvoice } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getSingleOrder } from 'utils'

const Page: NextPage = () => <OrderInvoice />

export default Page

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { order_id } = context?.query
  const token = context?.req?.cookies?.[process.env.TOKEN!]

  if (token) {
    if (!(await asyncHas(PermissionEnum.editOrderItem, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard"
        }
      }
    const { data: order } = await getSingleOrder(order_id as string, token)

    return {
      props: {
        initialState: {
          order,
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
