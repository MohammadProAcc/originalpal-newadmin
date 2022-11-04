import { TagsPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { PermissionEnum } from 'types';
import { asyncHas, getTagsList, search_in } from 'utils';

const PageName: NextPage = () => <TagsPage />;
export default PageName;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  if (token) {
    if (!(await asyncHas(PermissionEnum.browseTag, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard"
        }
      }
    const { data: result } = await search_in('tags', context.query, context.query, context.req.cookies[process.env.TOKEN!]);

    return {
      props: {
        initialState: {
          tags: {
            data: result,
            fields: [
              'id',
              'name',
              'type',
              'title',
              'meta_title',
              'meta_description',
              'description',
              'priority',
              'updated_at',
              'created_at',
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
