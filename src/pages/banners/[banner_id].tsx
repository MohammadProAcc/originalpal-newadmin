import { Banner } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { getSingleBanner } from 'utils/api/REST/actions/banners/getSingleBanner'

const SingleBanner: NextPage = () => <Banner />
export default SingleBanner

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const banner = await getSingleBanner(context.query.banner_id! as string, context?.req?.cookies?.token as string)

    return {
      props: {
        initialState: {
          banner,
        },
      },
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
