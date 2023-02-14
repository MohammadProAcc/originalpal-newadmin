import { dehydrate, QueryClient } from "@tanstack/react-query";
import { CreateMainPageSection } from "components/PageComponents/MainPageSection";
import { GetServerSideProps } from "next";
import React from "react";
import { PermissionEnum } from "types";
import { asyncHas, getAllBrands, getTagsList, search_in } from "utils";

const Create = () => <CreateMainPageSection />;

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
    if (!(await asyncHas(PermissionEnum.editMainPageSection, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
        },
      };

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["brands"], () => getAllBrands(token));
    await queryClient.prefetchQuery(["tags"], () => getTagsList({ q: "total" }, token));
    await queryClient.prefetchQuery(["banners"], () =>
      search_in(
        "banners",
        { key: "type", type: "=", value: "stand" },
        context.query,
        context.req.cookies[process.env.TOKEN!],
      ),
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
};
