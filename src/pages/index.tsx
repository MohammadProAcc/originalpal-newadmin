import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    router.push('/dashboard');
  }),
    [];
  return <div />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.req.cookies[process.env.TOKEN!]) {
    return {
      props: {},
      redirect: {
        destination: '/auth/login',
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
