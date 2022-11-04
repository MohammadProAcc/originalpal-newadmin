import { MenuPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, search_in } from 'utils'

const PageName: NextPage = () => <MenuPage />
export default PageName
export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  if (token) {
    if (!(await asyncHas(PermissionEnum.browseMenu, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard"
        }
      }
    const { data: result } = await search_in('menu', context.query, context.query, context.req.cookies[process.env.TOKEN!])

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
