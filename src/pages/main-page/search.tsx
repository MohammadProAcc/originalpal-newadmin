import { MainPages } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { PermissionEnum } from 'types';
import { asyncHas, search_in } from 'utils';
import { getMainPageBannersList } from 'utils/api/REST/actions/banners';

const Main: NextPage = () => <MainPages />;
export default Main;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  if (token) {
    if (!(await asyncHas(PermissionEnum.browseSlide, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard"
        }
      }
    const { data: result } = await search_in('banners', context.query, context.query, context.req.cookies[process.env.TOKEN!]);
    result.data = result?.data.filter((banner: any) => banner?.type === 'slide');

    return {
      props: {
        initialState: {
          mainPageBanners: {
            data: result,
            fields: [
              'id',
              'type',
              'platform',
              'media',
              'content',
              'content_color',
              'title_color',
              'title',
              'link',
              'priority',
              'active',
              'created_at',
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
