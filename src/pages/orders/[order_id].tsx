import React from 'react';
import { SingleOrderPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getSingleOrder } from 'utils';

const PageName: NextPage = () => <SingleOrderPage />;
export default PageName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const order = await getSingleOrder(context?.query?.order_id as string, context?.req?.cookies?.token);

    return {
      props: {
        initialState: {
          order: order?.data ?? null,
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
