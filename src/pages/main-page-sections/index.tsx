import { MainPageSectionPage } from "components/PageComponents/MainPageSection";
import { GetServerSideProps, NextPage } from "next";
import { getMainPageSectionsList } from "utils";

const PageName: NextPage = () => <MainPageSectionPage />;

export default PageName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  const params = context?.query;

  if (token) {
    const mainPageSections = await getMainPageSectionsList(params, token);

    return {
      props: {
        initialState: {
          mainPageSections,
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
