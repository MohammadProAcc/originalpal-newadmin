import { UsersPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getUsersList, search_in } from 'utils';

const PageName: NextPage = () => <UsersPage />;
export default PageName;
export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const { data: result } = await search_in('users', context.query, context.query, context.req.cookies.token);

    return {
      props: {
        initialState: {
          users: {
            data: result,
            fields: [
              'created_at',
              'email',
              'id',
              'lastname',
              'name',
              'password',
              'phone',
              'points',
              'role',
              'status',
              'updated_at',
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
