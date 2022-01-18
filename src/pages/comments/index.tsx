import { CommentsPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getCommentsList } from 'utils';

const PageName: NextPage = () => <CommentsPage />;

export default PageName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const comments = await getCommentsList(context?.query, context?.req?.cookies?.token);
    console.log(comments);
    return {
      props: {
        initialState: {
          comments,
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
