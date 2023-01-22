import { dehydrate, QueryClient } from '@tanstack/react-query'
import { TagsPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getTagsList } from 'utils'

const PageName: NextPage = () => <TagsPage />

export default PageName

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  const query = context?.query

  if (token) {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(['tags', query], async () => await getTagsList(query, token))

    if (!(await asyncHas(PermissionEnum.browseTag, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }

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
