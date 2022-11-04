import { EditSingleOrderPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { admin, asyncHas, getSingleOrder } from 'utils'

const SingleOrder: NextPage = () => <EditSingleOrderPage />
export default SingleOrder

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!(await asyncHas(PermissionEnum.editOrder, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const order = await getSingleOrder(context?.query?.order_id as string, context?.req?.cookies?.[process.env.TOKEN!])

    const { data: stocks } = await admin(context?.req?.cookies?.[process.env.TOKEN!]).get('/stock/select')

    return {
      props: {
        initialState: {
          order: order?.data,
          stocks: stocks.data,
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
