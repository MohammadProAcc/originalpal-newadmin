import { dehydrate, QueryClient } from "@tanstack/react-query";
import { SearchCouponsPage } from "components";
import { GetServerSideProps, NextPage } from "next";
import { PermissionEnum } from "types";
import { asyncHas, search_in } from "utils";

const PageName: NextPage = () => <SearchCouponsPage />;
export default PageName;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  const query = context?.query;

  if (token) {
    if (!(await asyncHas(PermissionEnum.browseCoupon, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
        },
      };

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["coupons", query], () => search_in("coupons", query, query, token));
    await queryClient.prefetchQuery(
      ["couponFields"],
      () =>
        new Promise((resolve) =>
          resolve([
            "id",
            "code",
            "decription",
            "type",
            "amount",
            "start",
            "expiration",
            "min_to_execute",
            "max",
            "deny_off",
            "limit",
            "user_id",
          ]),
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
