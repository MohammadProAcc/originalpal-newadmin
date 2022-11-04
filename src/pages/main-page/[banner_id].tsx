import { MainPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas } from 'utils'
import { getSingleBanner } from 'utils/api/REST/actions/banners/getSingleBanner'

const SingleMainPage: NextPage = () => <MainPage />
export default SingleMainPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]

  if (token) {
    if (!(await asyncHas(PermissionEnum.readMainPageSection, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const banner = await getSingleBanner(
      context.query.banner_id! as string,
      context?.req?.cookies?.[process.env.TOKEN!] as string,
    )

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
