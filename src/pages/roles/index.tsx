import { RolesPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { $_get_roles_list } from 'utils';

const PageName: NextPage = () => <RolesPage />;

export default PageName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const roles = await $_get_roles_list(context?.query, context?.req?.cookies?.token);
    if (roles?.status === 401) {
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
          roles,
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
