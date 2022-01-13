import { BrandsPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getBrandsList } from 'utils';

const PageName: NextPage = () => {
  return <BrandsPage />;
};

export default PageName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const brands = await getBrandsList(context?.query, context?.req?.cookies?.token);
    return {
      props: {
        initialState: {
          brands,
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
