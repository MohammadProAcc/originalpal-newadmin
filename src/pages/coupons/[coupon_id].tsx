import { SingleCouponPage } from 'components/PageComponents/Coupons/SingleCouponPage'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getSingleCoupon } from 'utils'

const SingleCoupon: NextPage = () => <SingleCouponPage />
export default SingleCoupon

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!(await asyncHas(PermissionEnum.readCoupon, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const coupon = await getSingleCoupon(
      context?.query?.coupon_id as string,
      context?.req?.cookies?.[process.env.TOKEN!],
    )

    return {
      props: {
        initialState: {
          coupon: coupon?.data,
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
