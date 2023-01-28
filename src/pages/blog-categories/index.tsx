import { dehydrate, QueryClient } from "@tanstack/react-query";
import { BlogCategoriesPage } from "components";
import { GetServerSideProps } from "next";
import { PermissionEnum } from "types";
import { $_get_categories, asyncHas } from "utils";

export default function Page() {
  return <BlogCategoriesPage />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[process.env.TOKEN!!];
  const query = context.query;

  if (token) {
    if (!(await asyncHas(PermissionEnum.browseBlogCategory, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
        },
      };

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["blog-categories"], () => $_get_categories({ token, params: query }));

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } else {
    return {
      props: {},
      redirect: {
        destination: "/dashboard",
      },
    };
  }
};
