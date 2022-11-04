import { EditBlogPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getSingleBlog } from 'utils';

const SingleBlog: NextPage = () => <EditBlogPage />;
export default SingleBlog;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.[process.env.TOKEN!]) {
    const blog = await getSingleBlog(context?.query?.blog_id as string, context?.req?.cookies?.[process.env.TOKEN!]);

    return {
      props: {
        initialState: {
          blog: blog?.data,
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
