import { dehydrate, QueryClient } from "@tanstack/react-query";
import { TagsPage } from "components";
import { GetServerSideProps, NextPage } from "next";
import { PermissionEnum } from "types";
import { asyncHas, search_in } from "utils";

const PageName: NextPage = () => <TagsPage />;
export default PageName;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  const query = context?.query;

  if (token) {
    if (!(await asyncHas(PermissionEnum.browseTag, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
        },
      };

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["tags", query], () => search_in("tags", query, query, token));
    await queryClient.prefetchQuery(
      ["tagFields"],
      () =>
        new Promise((resolve) =>
          resolve({
            fields: [
              "id",
              "name",
              "type",
              "title",
              "meta_title",
              "meta_description",
              "description",
              "priority",
              "updated_at",
              "created_at",
            ],
          }),
        ),
    );

    // const response = await search_in('tags', context.query, context.query, context.req.cookies[process.env.TOKEN!])

    // if (!response) {
    //   return {
    //     props: {},
    //     redirect: {
    //       destination: '/tags',
    //       permanent: false,
    //     },
    //   }
    // }

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
