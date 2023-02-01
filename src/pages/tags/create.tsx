import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { CreateTag } from "components";
import { GetServerSideProps } from "next";
import React from "react";
import { PermissionEnum } from "types";
import { asyncHas, getTagsList } from "utils";

const Create = () => <CreateTag />;

export default Create;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[process.env.TOKEN!];
  if (!token) {
    return {
      props: {},
      redirect: {
        destination: "/auth/login",
      },
    };
  } else {
    if (!(await asyncHas(PermissionEnum.browseTag, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
        },
      };

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["tags"], () => getTagsList({ page: "total" }));

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
};
