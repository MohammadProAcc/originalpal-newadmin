import { dehydrate, QueryClient } from "@tanstack/react-query";
import { SearchStockPage } from "components";
import { GetServerSideProps, NextPage } from "next";
import { PermissionEnum } from "types";
import { asyncHas, search_in } from "utils";

const PageName: NextPage = () => <SearchStockPage />;
export default PageName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  const query = context?.query;

  if (token) {
    if (!(await asyncHas(PermissionEnum.browseStock, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
        },
      };
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["stocks", query], () => search_in("stock", query, token));
    await queryClient.prefetchQuery(
      ["stockFields"],
      () =>
        new Promise((resolve) =>
          resolve({
            fields: [
              [
                "code",
                "count",
                "created_at",
                "disc",
                "discount_amout",
                "discount_end",
                "discount_start",
                "discount_type",
                "id",
                "price",
                "product_id",
                "size",
                "updated_at",
              ],
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
