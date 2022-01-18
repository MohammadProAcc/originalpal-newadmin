import { EditUserPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getSingleUser } from 'utils';

const SingleUser: NextPage = () => <EditUserPage />;
export default SingleUser;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const user = await getSingleUser(context?.query?.user_id as string, context?.req?.cookies?.token);

    return {
      props: {
        initialState: {
          user: user?.data,
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
