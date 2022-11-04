import { SingleMenuPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { getSingleMenu } from 'utils'

const SingleMenu: NextPage = () => <SingleMenuPage />
export default SingleMenu

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  const { menu_id } = context?.query

  if (token) {
    const menu = await getSingleMenu(menu_id as string, token)

    return {
      props: {
        initialState: {
          menu: menu?.data,
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
