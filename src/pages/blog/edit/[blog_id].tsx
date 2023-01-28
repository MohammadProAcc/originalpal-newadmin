import { dehydrate, QueryClient } from "@tanstack/react-query";
import { EditBlogPage } from "components";
import { useFetchAll } from "hooks";
import { GetServerSideProps, NextPage } from "next";
import { $_get_categories, $_get_category, getSingleBlog } from "utils";

const SingleBlog: NextPage = () => <EditBlogPage />;
export default SingleBlog;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  const query = context.query;

  if (token) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["blog", query], () => getSingleBlog(query?.blog_id as string, token));

    // TODO: implement it
    // const lastPage = (await $_get_categories({ token })).data.data.last_page;

    // const categories = await useFetchAll(
    //   lastPage,
    //   $_get_categories,
    // );

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
