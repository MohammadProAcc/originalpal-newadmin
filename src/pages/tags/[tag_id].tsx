import { SingleTagPage } from 'components/PageComponents/Tags/SingleTagPage';
import { GetServerSideProps, NextPage } from 'next';
import { getSingleTag } from 'utils';

const SingleTag: NextPage = () => <SingleTagPage />;
export default SingleTag;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const tag = await getSingleTag(context?.query?.tag_id as string, context?.req?.cookies?.token);

    return {
      props: {
        initialState: {
          tag: tag?.data,
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
