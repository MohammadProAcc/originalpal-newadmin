import { dehydrate, QueryClient } from "@tanstack/query-core";
import { EditMainPage } from "components";
import { GetServerSideProps, NextPage } from "next";
import { PermissionEnum } from "types";
import { asyncHas } from "utils";
import { getSingleBanner } from "utils/api/REST/actions/banners/getSingleBanner";

const EditSingleMainPage: NextPage = () => <EditMainPage />;
export default EditSingleMainPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  const banner_id = context.query.banner_id as string;

  if (token) {
    if (!(await asyncHas(PermissionEnum.editSlide, token))) {
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
        },
      };
    }
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(
      ["banner", banner_id],
      () =>
        getSingleBanner(
          banner_id,
          token,
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
