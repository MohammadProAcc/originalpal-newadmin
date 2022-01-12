import { MainPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getMainPageBannersList } from 'utils/api/REST/actions/banners';

const Main: NextPage = () => <MainPage />;
export default Main;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mainPageBanners = await getMainPageBannersList(context.query, context.req.cookies.token);
  mainPageBanners.data.data = mainPageBanners?.data?.data.filter((banner: any) => banner?.type === 'slide');

  return {
    props: {
      initialState: {
        mainPageBanners,
      },
    },
  };
};
