import { dehydrate, QueryClient } from "@tanstack/react-query";
import { SearchBanners } from "components";
import { GetServerSideProps, NextPage } from "next";
import { PermissionEnum } from "types";
import { asyncHas, search_in } from "utils";

// Fix Searching Mechanism
const Main: NextPage = () => <SearchBanners />;
export default Main;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  const query = context?.query;

  if (token) {
    if (!(await asyncHas(PermissionEnum.browseStand, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
        },
      };

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["banners", query], () =>
      search_in("banners", query, query, token).then((response) => {
        response.data.data = response?.data?.data.filter((banner: any) => banner?.type === "stand");
        return response;
      }),
    );
    await queryClient.prefetchQuery(
      ["bannerFields"],
      () =>
        new Promise((resolve) =>
          resolve({
            fields: [
              "id",
              "type",
              "platform",
              "media",
              "content",
              "content_color",
              "title_color",
              "title",
              "link",
              "priority",
              "active",
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
