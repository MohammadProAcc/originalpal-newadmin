import { GetServerSideProps, NextPage } from 'next';

const PageName: NextPage = () => <div>......:::: Page Component ::::......</div>;
export default PageName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.[process.env.TOKEN!]) {
    // const sample = await ......:::: Fetch Single Item ::::......

    return {
      props: {
        initialState: {
          // sample ......:::: Passing Single Item ::::...... ,
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
