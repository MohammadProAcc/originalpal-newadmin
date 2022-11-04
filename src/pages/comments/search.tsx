import { CommentsPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getCommentsList, search_in } from 'utils'

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
    const { data: result } = await search_in(
      'comments',
      context.query,
      context.query,
      context.req.cookies[process.env.TOKEN!],
    )

    return {
      props: {
        initialState: {
          comments: {
            data: result,
            fields: [
              'comfort',
              'content',
              'created_at',
              'id',
              'product_id',
              'purchased',
              'quality',
              'rating',
              'size',
              'title',
              'updated_at',
              'user_id',
              'width',
            ],
          },
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
