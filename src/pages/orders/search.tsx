import { OrdersPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getOrdersList, search_in } from 'utils';

const SearchOrders: NextPage = () => <OrdersPage />;
export default SearchOrders;
export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
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
