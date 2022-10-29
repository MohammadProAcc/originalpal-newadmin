import { UsersPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getUsersList } from 'utils';

const PageName: NextPage = () => <UsersPage />;

export default PageName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(">>>>>>>>>>>>>>>>^^^^^^^^^^^^^>>>>>>>>>")
  if (context?.req?.cookies?.token) {
    const users = await getUsersList(context?.query, context?.req?.cookies?.token);
    console.log(users)
    if (users?.status === 401) {
      return {
        props: {},
        redirect: {
          destination: '/auth/login',
        },
      };
    }
    return {
      props: {
        initialState: {
          users: {
            data: users?.table,
            fields: users?.fields,
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
