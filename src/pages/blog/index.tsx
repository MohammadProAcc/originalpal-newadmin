import { dehydrate, QueryClient } from "@tanstack/react-query";
import { BlogsPage } from "components";
import { GetServerSideProps, NextPage } from "next";
import { PermissionEnum } from "types";
import { asyncHas, getBlogList } from "utils";

const PageName: NextPage = () => <BlogsPage />;

export default PageName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  const query = context.query;

  if (token) {
    if (!(await asyncHas(PermissionEnum.browseBlog, token))) {
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
        },
      };
    }
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["blogs", query], () => getBlogList(query, token));

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
