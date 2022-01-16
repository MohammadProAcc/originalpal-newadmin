import { TagsPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getTagsList, search_in } from 'utils';

const PageName: NextPage = () => <TagsPage />;
export default PageName;
export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const { data: result } = await search_in('tags', context.query, context.query, context.req.cookies.token);

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
