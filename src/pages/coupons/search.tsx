import { CouponsPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getCouponsList, search_in } from 'utils'

const PageName: NextPage = () => <CouponsPage />
export default PageName
export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!(await asyncHas(PermissionEnum.browseCoupon, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const response = await search_in('coupons', context.query, context.query, context.req.cookies[process.env.TOKEN!])

    if (!response) {
      return {
        props: {},
        redirect: {
          destination: '/coupons',
          permanent: false,
        },
      }
    }

    return {
      props: {
        initialState: {
          coupons: {
            data: response?.data,
            fields: [
              'amount',
              'code',
              'created_at',
              'decription',
              'deleted_at',
              'deny_off',
              'expiration',
              'id',
              'limit',
              'max',
              'min_to_execute',
              'start',
              'type',
              'updated_at',
              'user_id',
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
