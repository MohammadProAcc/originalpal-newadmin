import { UsersPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getUsersList, search_in } from 'utils'

const PageName: NextPage = () => <UsersPage />
export default PageName
export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!(await asyncHas(PermissionEnum.browseUser, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const { data: result } = await search_in(
      'users',
      context.query,
      context.query,
      context.req.cookies[process.env.TOKEN!],
    )

    return {
      props: {
        initialState: {
          users: {
            data: result,
            fields: [
              'created_at',
              'email',
              'id',
              'lastname',
              'name',
              'password',
              'phone',
              'points',
              'role',
              'status',
              'updated_at',
            ],
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
