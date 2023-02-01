import { BrandsPage } from "components";
import { GetServerSideProps, NextPage } from "next";
import { PermissionEnum } from "types";
import { asyncHas, search_in } from "utils";

const PageName: NextPage = () => <BrandsPage />;
export default PageName;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  if (token) {
    if (!(await asyncHas(PermissionEnum.browseBrand, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
        },
      };
    const response = await search_in("brands", context.query, context.query, context.req.cookies[process.env.TOKEN!]);

    if (!response) {
      return {
        props: {},
        redirect: {
          destination: "/brands",
        },
      };
    }

    return {
      props: {
        initialState: {
          brands: {
            data: response?.data,
            fields: ["id", "name", "title_page", "meta_title", "meta_keywords", "meta_description"],
          },
        },
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
