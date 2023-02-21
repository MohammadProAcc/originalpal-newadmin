import { GetServerSideProps } from "next";

export default () => {};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
    redirect: {
      destination: context.query.path === ":1" ? "/" : context.query.path,
      permanent: false,
    },
  };
};
