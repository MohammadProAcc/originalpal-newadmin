import { GetServerSideProps, NextPage } from 'next';

const PageName: NextPage = () => <div>PageComponent</div>;

export default PageName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.[process.env.TOKEN!]) {
    return {
      props: {},
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
