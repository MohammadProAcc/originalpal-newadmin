import { OrdersPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getOrdersList, search_in } from 'utils';

const SearchOrders: NextPage = () => <OrdersPage />;
export default SearchOrders;
export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const { fields } = await getOrdersList(context?.query, context?.req?.cookies?.token);
    const { data: orders } = await search_in(
      'orders',
      {
        key: context?.query?.key,
        type: context?.query?.type,
        value: context?.query?.value,
      },
      context.query,
      context.req.cookies.token,
    );

    return {
      props: {
        initialState: {
          orders: {
            data: orders,
            fields,
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
