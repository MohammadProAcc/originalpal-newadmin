import { SingleUserPage } from 'components/PageComponents/Users/SingleUserPage';
import { GetServerSideProps, NextPage } from 'next';
import { PermissionEnum } from 'types';
import { asyncHas, getSingleUser } from 'utils';

const SingleUser: NextPage = () => <SingleUserPage />;
export default SingleUser;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  if (token) {
    if (!(await asyncHas(PermissionEnum.readUser, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard"
        }
      }
    const user = await getSingleUser(context?.query?.user_id as string, context?.req?.cookies?.[process.env.TOKEN!]);

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
