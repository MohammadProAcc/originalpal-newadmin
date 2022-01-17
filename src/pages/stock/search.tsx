import { StockPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { search_in } from 'utils';

const PageName: NextPage = () => <StockPage />;
export default PageName;
export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const { data: result } = await search_in('stock', context.query, context.query, context.req.cookies.token);

    return {
      props: {
        initialState: {
          stocks: {
            data: result,
            fields: [
              'code',
              'count',
              'created_at',
              'disc',
              'discount_amout',
              'discount_end',
              'discount_start',
              'discount_type',
              'id',
              'price',
              'product_id',
              'size',
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
