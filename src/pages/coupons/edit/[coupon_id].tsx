import { EditCouponPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getSingleCoupon } from 'utils';

const SingleCoupon: NextPage = () => <EditCouponPage />;
export default SingleCoupon;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const coupon = await getSingleCoupon(context?.query?.coupon_id as string, context?.req?.cookies?.token);

    return {
      props: {
        initialState: {
          coupon: coupon?.data,
        },
      },
    };
  } else {
    return {
      props: {},
      redirect: {
        destination: '/auth/login',
      },
    };
  }
};
