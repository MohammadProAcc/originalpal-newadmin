import { MenuPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { getMenusList } from 'utils'

const PageName: NextPage = () => <MenuPage />

export default PageName

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.token
  const params = context?.query

  if (token) {
    const menu = await getMenusList(params, token)
    console.log(menu)
    if (menu?.status === 401) {
      return {
        props: {},
        redirect: {
          destination: '/auth/login',
        },
      }
    }
    return {
      props: {
        initialState: {
          menu: {
            data: menu?.data,
            fields: menu?.fields,
          },
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
