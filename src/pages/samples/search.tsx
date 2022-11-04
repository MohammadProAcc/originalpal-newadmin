import {} from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { search_in } from 'utils';

const PageName: NextPage = () => <div>......:::: Page Component ::::......</div>;
export default PageName;
export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.[process.env.TOKEN!]) {
    // const { fields } = await ......:::: Fetching fields ::::......
    const { data: result } = await search_in(
      '......:::: Entity To Search ::::......',
      context.query,
      context.query,
      context.req.cookies[process.env.TOKEN!],
    );

    return {
      props: {
        initialState: {
          sample: {
            data: result,
            // fields ......:::: Passing Fields ::::......,
          },
        },
      },
    };
  } else {
    return {
      props: {},
      redirect: {
        destination: '/auth/login',
      },
    };
  }
};
