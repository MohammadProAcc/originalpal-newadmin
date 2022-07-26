import { SingleBlogPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { getSingleBlog } from 'utils'

const SingleBlog: NextPage = () => <SingleBlogPage />
export default SingleBlog

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const blog = await getSingleBlog(context?.query?.blog_id as string, context?.req?.cookies?.token)

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
