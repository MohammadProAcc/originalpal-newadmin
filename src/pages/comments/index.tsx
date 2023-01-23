import { dehydrate, hydrate, QueryClient } from '@tanstack/react-query'
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
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(["comments"], () => getCommentsList(context?.query, token))

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
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
