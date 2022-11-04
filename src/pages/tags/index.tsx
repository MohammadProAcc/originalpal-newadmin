import { TagsPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getTagsList } from 'utils'

const PageName: NextPage = () => <TagsPage />

export default PageName

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    const tags = await getTagsList(context?.query, context?.req?.cookies?.[process.env.TOKEN!])
    if (!(await asyncHas(PermissionEnum.browseTag, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }

    return {
      props: {
        initialState: {
          tags,
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
