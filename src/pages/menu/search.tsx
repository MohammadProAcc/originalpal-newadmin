import { MenuPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { search_in } from 'utils'

const PageName: NextPage = () => <MenuPage />
export default PageName
export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const { data: result } = await search_in('menu', context.query, context.query, context.req.cookies.token)

    return {
      props: {
        initialState: {
          menu: {
            data: result,
            fields: ['created_at', 'id', 'items', 'type', 'updated_at'],
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
