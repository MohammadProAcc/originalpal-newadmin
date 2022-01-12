import { MainPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getSingleBanner } from 'utils/api/REST/actions/banners/getSingleBanner';

const SingleMainPage: NextPage = () => <MainPage />;
export default SingleMainPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const banner = await getSingleBanner(context.query.banner_id! as string, context?.req?.cookies?.token as string);

  return {
    props: {
      initialState: {
        banner,
      },
    },
  };
};
