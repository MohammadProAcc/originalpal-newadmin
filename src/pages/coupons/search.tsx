import { CouponsPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getCouponsList, search_in } from 'utils';

const PageName: NextPage = () => <CouponsPage />;
export default PageName;
export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const { data: result } = await search_in('coupons', context.query, context.query, context.req.cookies.token);

    return {
      props: {
        initialState: {
          coupons: {
            data: result,
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
