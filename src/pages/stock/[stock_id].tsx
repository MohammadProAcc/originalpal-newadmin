import { SingleStockPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getSingleStock } from 'utils';

const SingleStock: NextPage = () => <SingleStockPage />;
export default SingleStock;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const stock = await getSingleStock(context?.query?.stock_id as string, context?.req?.cookies?.token);
    console.log(stock);

    return {
      props: {
        initialState: {
          stock,
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
