import { dehydrate, QueryClient } from "@tanstack/react-query";
import { AggregateDiscountingPage } from "components";
import { GetServerSideProps } from "next";
import { PermissionEnum, Stock } from "types";
import { admin, asyncHas } from "utils";

export default function Page() {
  return <AggregateDiscountingPage />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];

  if (token) {
    if (!(await asyncHas(PermissionEnum.editCoupon, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
        },
      };
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["stocks-list"], () =>
      admin(token)
        .get("/stock/select")
        .then((res) => res.data?.data?.filter((stock: Stock) => !!stock?.product_id)),
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
