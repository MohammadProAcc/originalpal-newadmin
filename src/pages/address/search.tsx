import { AddressesPage } from "components";
import { GetServerSideProps, NextPage } from "next";
import { PermissionEnum } from "types";
import { asyncHas, search_in } from "utils";

const SearchAddresses: NextPage = () => <AddressesPage />;
export default SearchAddresses;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  if (token) {
    if (!(await asyncHas(PermissionEnum.browseAddress, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard",
        },
      };
    const { data: addresses } = await search_in(
      "address",
      {
        key: context?.query?.key,
        type: context?.query?.type,
        value: context?.query?.value,
      },
      context.query,
      context.req.cookies[process.env.TOKEN!],
    );

    return {
      props: {
        initialState: {
          addresses: {
            data: addresses,
            fields: ["id", "postalcode", "city", "address", "province", "user_id"],
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
