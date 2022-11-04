import { DashboardPage } from 'components';
import Layout from 'Layouts';
import { GetServerSideProps } from 'next';
import React from 'react';
import { getOrdersList, getProductsList, getUsersList } from 'utils';

const Home = () => {
  return (
    <Layout title="Home">
      <DashboardPage />
    </Layout>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.req.cookies[process.env.TOKEN!]) {
    const products = await getProductsList(context.query, context.req.cookies[process.env.TOKEN!]);
    const users = await getUsersList(context.query, context.req.cookies[process.env.TOKEN!]);
    const orders = await getOrdersList(context.query, context.req.cookies[process.env.TOKEN!]);
    return {
      props: {
        initialState: {
          products,
          users,
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
