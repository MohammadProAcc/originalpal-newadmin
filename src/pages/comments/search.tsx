import { dehydrate, QueryClient } from "@tanstack/react-query";
import { SearchCommentsPage } from "components";
import { GetServerSideProps, NextPage } from "next";
import { PermissionEnum } from "types";
import { asyncHas, search_in } from "utils";

const PageName: NextPage = () => <SearchCommentsPage />;
export default PageName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  const query = context?.query;

  if (token) {
    if (!(await asyncHas(PermissionEnum.browseComment, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
        },
      };

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["comments", query], () => search_in("comments", query, query, token));
    await queryClient.prefetchQuery(
      ["commentFields"],
      () =>
        new Promise((resolve) =>
          resolve({
            fields: [
              "id",
              "title",
              "content",
              "product_id",
              "user_id",
              "rating",
              "size",
              "comfort",
              "width",
              "purchased",
              "quality",
            ],
          }),
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
