import { MainPageSectionPage } from "components/PageComponents/MainPageSection";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { PermissionEnum } from "types";
import { asyncHas, search_in } from "utils";

const PageName: NextPage = () => <MainPageSectionPage />;
export default PageName;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  if (token) {
    if (!(await asyncHas(PermissionEnum.browseMainPageSection, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
        },
      };
    const response = await search_in(
      "main-page/sections",
      context.query,
      context.query,
      context.req.cookies[process.env.TOKEN!],
    );

    if (!response) {
      return {
        props: {},
        redirect: {
          destination: "/main-page-sections",
          permanent: false,
        },
      };
    }

    return {
      props: {
        initialState: {
          mainPageSections: {
            data: response?.data,
            // TODO: add search fileds
            fields: [],
          },
        },
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
