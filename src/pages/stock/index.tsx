import { StockPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getStocksList } from 'utils';

const PageName: NextPage = () => <StockPage />;

export default PageName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const stocks = await getStocksList(context?.query, context?.req?.cookies?.token);
    console.log(stocks);
    return {
      props: {
        initialState: {
          stocks,
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
