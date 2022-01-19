import { BlogsPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getBlogList } from 'utils';

const PageName: NextPage = () => <BlogsPage />;

export default PageName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const blog = await getBlogList(context?.query, context?.req?.cookies?.token);
    console.log(blog);
    return {
      props: {
        initialState: {
          blog,
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
