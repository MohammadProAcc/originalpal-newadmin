import { CouponsPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getCouponsList } from 'utils'

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
    const coupons = await getCouponsList(context?.query, context?.req?.cookies?.[process.env.TOKEN!])

    return {
      props: {
        initialState: {
          coupons,
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
