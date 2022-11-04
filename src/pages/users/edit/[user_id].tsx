import { EditUserPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { $_get_roles_list, asyncHas, getSingleUser } from 'utils'

const SingleUser: NextPage = () => <EditUserPage />
export default SingleUser

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!(await asyncHas(PermissionEnum.editUser, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const user = await getSingleUser(context?.query?.user_id as string, context?.req?.cookies?.[process.env.TOKEN!])
    const roles = await $_get_roles_list({}, context?.req?.cookies?.[process.env.TOKEN!])

    return {
      props: {
        initialState: {
          user: user?.data,
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
