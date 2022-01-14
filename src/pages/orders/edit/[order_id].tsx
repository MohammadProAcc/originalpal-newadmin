import { EditSingleOrderPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { admin, getSingleOrder } from 'utils';

const SingleOrder: NextPage = () => <EditSingleOrderPage />;
export default SingleOrder;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const order = await getSingleOrder(context?.query?.order_id as string, context?.req?.cookies?.token);

    const { data: stocks } = await admin(context?.req?.cookies?.token).get('/stock/select');

    return {
      props: {
        initialState: {
          order: order?.data,
          stocks: stocks.data,
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
