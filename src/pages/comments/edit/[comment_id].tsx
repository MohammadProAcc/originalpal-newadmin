import { EditCommentPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { getSingleComment } from 'utils';

const SingleComment: NextPage = () => <EditCommentPage />;
export default SingleComment;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const comment = await getSingleComment(context?.query?.comment_id as string, context?.req?.cookies?.token);

    return {
      props: {
        initialState: {
          comment: comment?.data,
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
