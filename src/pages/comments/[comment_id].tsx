import { SingleCommentPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getSingleComment } from 'utils'

const SingleComment: NextPage = () => <SingleCommentPage />
export default SingleComment

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!(await asyncHas(PermissionEnum.readComment, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const comment = await getSingleComment(
      context?.query?.comment_id as string,
      context?.req?.cookies?.[process.env.TOKEN!],
    )

    return {
      props: {
        initialState: {
          comment: comment?.data,
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
