import { dehydrate, QueryClient } from '@tanstack/react-query'
import { EditSingleOrderPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { admin, asyncHas, getCouponsList, getSingleOrder } from 'utils'

const SingleOrder: NextPage = () => <EditSingleOrderPage />
export default SingleOrder

export const getServerSideProps: GetServerSideProps = async (context) => {
  const orderId = context?.query?.order_id as string;
  const token = context?.req?.cookies?.[process.env.TOKEN!]

  if (token) {
    if (!(await asyncHas(PermissionEnum.editOrder, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(["order", orderId], () => getSingleOrder(orderId, token));
    await queryClient.prefetchQuery(["stocks"], () => (admin(token).get('/stock/select')).then(res => res.data));
    await queryClient.prefetchQuery(["coupons"], () => getCouponsList({ q: "total" }, token));

    return {
      props: {
        dehydratedState: dehydrate(queryClient)
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
