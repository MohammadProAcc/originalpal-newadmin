import { CouponsPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getCouponsList } from 'utils';

const PageName: NextPage = () => <CouponsPage />;

export default PageName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const coupons = await getCouponsList(context?.query, context?.req?.cookies?.token);
    console.log(coupons);
    return {
      props: {
        initialState: {
          coupons,
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
