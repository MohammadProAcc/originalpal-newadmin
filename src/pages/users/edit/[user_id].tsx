import { dehydrate, QueryClient } from "@tanstack/react-query";
import { EditUserPage } from "components";
import { GetServerSideProps, NextPage } from "next";
import { PermissionEnum } from "types";
import { $_get_roles_list, asyncHas, getSingleUser } from "utils";

const SingleUser: NextPage = () => <EditUserPage />;
export default SingleUser;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  const query = context?.query;

  if (token) {
    if (!(await asyncHas(PermissionEnum.editUser, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
        },
      };

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["roles"], () => $_get_roles_list({}, token));
    await queryClient.prefetchQuery(["user"], () =>
      getSingleUser(context?.query?.user_id as string, token).then((res) => res.data),
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
