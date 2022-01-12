import { MainPages } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { search_in } from 'utils';
import { getMainPageBannersList } from 'utils/api/REST/actions/banners';

const Main: NextPage = () => <MainPages />;
export default Main;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { fields } = await getMainPageBannersList(context.query, context.req.cookies.token);
  const { data: result } = await search_in(
    'banners',
    { key: 'type', type: '=', value: 'slide' },
    context.query,
    context.req.cookies.token,
  );

  return {
    props: {
      initialState: {
        mainPageBanners: {
          data: result,
          fields,
        },
      },
    },
  };
};
