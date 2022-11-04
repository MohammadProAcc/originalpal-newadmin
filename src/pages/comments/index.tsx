import { CommentsPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getCommentsList } from 'utils'

const PageName: NextPage = () => <CommentsPage />

export default PageName

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!(await asyncHas(PermissionEnum.browseComment, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const comments = await getCommentsList(context?.query, context?.req?.cookies?.[process.env.TOKEN!])
    return {
      props: {
        initialState: {
          comments,
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
