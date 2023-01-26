import { dehydrate, QueryClient } from "@tanstack/react-query";
import { EditCommentPage } from "components";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { PermissionEnum } from "types";
import { asyncHas, getSingleComment } from "utils";

const SingleComment: NextPage = () => <EditCommentPage />;
export default SingleComment;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  const query = context?.query;
  if (token) {
    if (!(await asyncHas(PermissionEnum.editComment, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
        },
      };
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["comment", query], () =>
      getSingleComment(query?.comment_id as string, token).then((res) => res.data),
    );
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } else {
    return {
      props: {},
      redirect: {
        destination: "/auth/login",
      },
    };
  }
};
