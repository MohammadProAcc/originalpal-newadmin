import { dehydrate, QueryClient } from "@tanstack/react-query";
import { CreateOrderPage } from "components";
import { GetServerSideProps } from "next";
import { PermissionEnum } from "types";
import { admin, asyncHas, getOwnAddresses } from "utils";

export default function Page() {
  return (
    <CreateOrderPage />
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!(await asyncHas(PermissionEnum.addOrder, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(["stocks"], async () => (await admin(context?.req?.cookies?.[process.env.TOKEN!]).get('/stock/select')).data);
    await queryClient.prefetchQuery(["addresses"], () => getOwnAddresses({token}));

    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      }
    }

  } else {
    return {
      props: {},
      redirect: {
        destination: '/auth/login',
      },
    }
  }
}
