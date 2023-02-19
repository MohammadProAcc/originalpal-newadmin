import { dehydrate, QueryClient } from "@tanstack/react-query";
import { EditBlogPage } from "components";
import { GetServerSideProps, NextPage } from "next";
import { $_get_categories, getSingleBlog } from "utils";

const SingleBlog: NextPage = () => <EditBlogPage />;
export default SingleBlog;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  const query = context.query;

  if (token) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["blog"], () => getSingleBlog(query?.blog_id as string, token));
    await queryClient.prefetchQuery(["categories"], () =>
      $_get_categories({
        params: {
          q: "total",
        },
      }).then((res) => res.data),
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
