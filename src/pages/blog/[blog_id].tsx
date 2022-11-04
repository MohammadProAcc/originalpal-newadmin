import { SingleBlogPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getSingleBlog } from 'utils'

const SingleBlog: NextPage = () => <SingleBlogPage />
export default SingleBlog

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!(await asyncHas(PermissionEnum.readBlog, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const blog = await getSingleBlog(context?.query?.blog_id as string, context?.req?.cookies?.[process.env.TOKEN!])

    return {
      props: {
        initialState: {
          blog: blog?.data,
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
