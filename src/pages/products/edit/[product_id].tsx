import { EditProductPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getBrandsList, getSingleProduct } from 'utils';

const SingleProduct: NextPage = () => <EditProductPage />;
export default SingleProduct;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const product = await getSingleProduct(context?.query?.product_id as string, context?.req?.cookies?.token);
    const brands = await getBrandsList(context?.query, context?.req?.cookies?.token);

    return {
      props: {
        initialState: {
          product,
          brands: brands.data,
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
