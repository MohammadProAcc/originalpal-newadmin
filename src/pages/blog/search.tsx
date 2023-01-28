import { dehydrate, QueryClient } from "@tanstack/react-query";
import { SearchBlogsPage } from "components";
import { GetServerSideProps, NextPage } from "next";
import { PermissionEnum } from "types";
import { asyncHas, search_in } from "utils";

const PageName: NextPage = () => <SearchBlogsPage />;
export default PageName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  const query = context.query;

  if (token) {
    if (!(await asyncHas(PermissionEnum.browseBlog, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
        },
      };

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["blogs", query], () =>
      search_in("blog", query, { page: query.page }, token).then((res) => ({
        ...res,
        fields: [
          "comments",
          "created_at",
          "deleted_at",
          "desc",
          "endalt",
          "endimage",
          "endtext",
          "endtitle",
          "headers",
          "id",
          "is_news",
          "isboard",
          "iscast",
          "ishighlight",
          "istop",
          "isvideo",
          "labels",
          "meta_description",
          "meta_keywords",
          "meta_title",
          "show_categories",
          "slug",
          "srcvideo",
          "summary",
          "thumb",
          "title",
          "title_page",
          "trend",
          "updated_at",
          "writer",
        ],
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
        destination: "/auth/login",
      },
    };
  }
};
