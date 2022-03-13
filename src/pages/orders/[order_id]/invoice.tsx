import { OrderInvoice } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { getSingleOrder } from 'utils'

const Page: NextPage = () => <OrderInvoice />

export default Page

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { order_id } = context?.query
  const token = context?.req?.cookies?.token

  const { data: order } = await getSingleOrder(order_id as string, token)

  return {
    props: {
      initialState: {
        order,
      },
    },
  }
}
