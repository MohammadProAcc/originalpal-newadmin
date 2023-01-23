import { OrdersPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getOrdersList, search_in } from 'utils'

const SearchOrders: NextPage = () => <OrdersPage />
export default SearchOrders
export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!(await asyncHas(PermissionEnum.browseUser, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const response = await search_in(
      'orders',
      {
        key: context?.query?.key,
        type: context?.query?.type,
        value: context?.query?.value,
      },
      context.query,
      context.req.cookies[process.env.TOKEN!],
    )

    if (!response) {
      return {
        props: {},
        redirect: {
          destination: '/orders',
          permanent: false,
        },
      }
    }

    return {
      props: {
        initialState: {
          orders: {
            data: response?.data,
            fields: [
              'id',
              'number',
              'status',
              'user_id',
              'payment_id',
              'address_id',
              'notes',
              'price',
              'post_fee',
              'payable',
              'newprice',
              'Events',
              'created_at',
              'updated_at',
              'deleted_at',
              'delivery',
              'admin_check',
              'coupon_id',
              'typesell',
            ],
          },
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
