import { dehydrate, QueryClient } from "@tanstack/react-query";
import { UsersPage } from "components";
import { GetServerSideProps, NextPage } from "next";
import { PermissionEnum } from "types";
import { asyncHas, getUsersList } from "utils";

const PageName: NextPage = () => <UsersPage />;

export default PageName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  const query = context?.query;

  if (token) {
    if (!(await asyncHas(PermissionEnum.browseUser, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
        },
      };

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["users", query], () =>
      getUsersList(context?.query, context?.req?.cookies?.[process.env.TOKEN!]),
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
