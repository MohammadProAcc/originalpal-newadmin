import { RolesPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { $_get_roles_list, asyncHas } from 'utils'

const PageName: NextPage = () => <RolesPage />

export default PageName

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!(await asyncHas(PermissionEnum.browseRole, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const roles = await $_get_roles_list(context?.query, context?.req?.cookies?.[process.env.TOKEN!])

    if (!roles) {
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
          roles,
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
