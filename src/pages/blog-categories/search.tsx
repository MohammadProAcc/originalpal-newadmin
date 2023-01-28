import { dehydrate, QueryClient } from "@tanstack/react-query";
import { SearchBlogCategoriesPage } from "components";
import { GetServerSideProps } from "next";
import { PermissionEnum } from "types";
import { asyncHas, search_in } from "utils";

export default function Page() {
  return <SearchBlogCategoriesPage />;
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
    await queryClient.prefetchQuery(["blog-categories", query], () =>
      search_in(
        "categories",
        {
          key: context?.query?.key,
          type: context?.query?.type,
          value: context?.query?.value,
        },
        { page: query.page },
        token,
      ).then((res) => ({
        ...res,
        data: {
          ...res.data,
          fields: ["id", "slug", "title", "content", "priority", "created_at", "updated_at"],
        },
      })),
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
        destination: "/dashboard",
      },
    };
  }
};
