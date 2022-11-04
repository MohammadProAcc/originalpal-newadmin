import { BlogsPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getBlogList } from 'utils'

const PageName: NextPage = () => <BlogsPage />

export default PageName

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!(await asyncHas(PermissionEnum.browseBlog, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const blog = await getBlogList(context?.query, context?.req?.cookies?.[process.env.TOKEN!])
    console.log(blog)
    return {
      props: {
        initialState: {
          blog,
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
