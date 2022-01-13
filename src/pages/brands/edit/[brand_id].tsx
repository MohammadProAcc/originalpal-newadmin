import { EditBrandPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getSingleBrand } from 'utils';

const SingleBrand: NextPage = () => <EditBrandPage />;
export default SingleBrand;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const brand = await getSingleBrand(context?.query?.brand_id as string, context?.req?.cookies?.token);

    return {
      props: {
        initialState: {
          brand: brand?.data,
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
