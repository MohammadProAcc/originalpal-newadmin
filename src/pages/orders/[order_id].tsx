import React from 'react';
import { SingleOrderPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { asyncHas, getSingleOrder } from 'utils';
import { PermissionEnum } from 'types';

const PageName: NextPage = () => <SingleOrderPage />;
export default PageName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  if (token) {
    if (!(await asyncHas(PermissionEnum.editUser, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard"
        }
      }
    const order = await getSingleOrder(context?.query?.order_id as string, context?.req?.cookies?.[process.env.TOKEN!]);

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
