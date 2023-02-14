import { dehydrate, QueryClient } from "@tanstack/react-query";
import { EditMainPageSectionPage } from "components/PageComponents/MainPageSection";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { PermissionEnum } from "types";
import { asyncHas, getAllBrands, getSingleMainPageSection, getTagsList, search_in } from "utils";

const SingleMainPageSection: NextPage = () => <EditMainPageSectionPage />;
export default SingleMainPageSection;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  const id = context?.query?.main_page_section_id as string;

  if (token) {
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
    await queryClient.prefetchQuery(["main-page-section"], () => getSingleMainPageSection(id, token));
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
  } else {
    return {
      props: {},
      redirect: {
        destination: "/auth/login",
      },
    };
  }
};
