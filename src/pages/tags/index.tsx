import { TagsPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getTagsList } from 'utils';

const PageName: NextPage = () => <TagsPage />;

export default PageName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const tags = await getTagsList(context?.query, context?.req?.cookies?.token);
    console.log(tags);
    return {
      props: {
        initialState: {
          tags,
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
