import { SingleStockPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { PermissionEnum } from 'types';
import { asyncHas, getSingleStock } from 'utils';

const SingleStock: NextPage = () => <SingleStockPage />;
export default SingleStock;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  if (token) {
    if (!(await asyncHas(PermissionEnum.readStock, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const stock = await getSingleStock(context?.query?.stock_id as string, context?.req?.cookies?.[process.env.TOKEN!]);

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
