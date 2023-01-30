import { ProductsPage } from "components";
import { GetServerSideProps, NextPage } from "next";
import { PermissionEnum } from "types";
import { asyncHas, search_in } from "utils";

const PageName: NextPage = () => <ProductsPage />;
export default PageName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  if (token) {
    if (!(await asyncHas(PermissionEnum.browseProduct, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
        },
      };
    const response = await search_in("products", context.query, context.query, context.req.cookies[process.env.TOKEN!]);

    if (!response) {
      return {
        props: {},
        redirect: {
          destination: "/products",
          permanent: false,
        },
      };
    }

    return {
      props: {
        initialState: {
          products: {
            data: response?.data,
            fields: [
              "id",
              "code",
              "name",
              "title",
              "slug",
              "price",
              "discount_price",
              "description",
              "state",
              "meta_keywords",
              "meta_description",
              "brand_id",
              "sold",
              "trend",
              "category_id",
              "summary",
              "meta_title",
              "title_page",
              "onesize",
              "Enable",
            ],
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
