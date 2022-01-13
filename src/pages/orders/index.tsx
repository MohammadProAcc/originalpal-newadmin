import { OrdersPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getOrdersList } from 'utils';

const Orders: NextPage = () => <OrdersPage />;

export default Orders;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const orders = await getOrdersList(context?.query, context?.req?.cookies?.token);

    return {
      props: {
        initialState: {
          orders,
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
