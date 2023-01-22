import { BlogsPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, search_in } from 'utils'

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
    const { data: result } = await search_in(
      'blog',
      context.query,
      context.query,
      context.req.cookies[process.env.TOKEN!],
    )

    return {
      props: {
        initialState: {
          blog: {
            data: result,
            fields: [
              'comments',
              'created_at',
              'deleted_at',
              'desc',
              'endalt',
              'endimage',
              'endtext',
              'endtitle',
              'headers',
              'id',
              'is_news',
              'isboard',
              'iscast',
              'ishighlight',
              'istop',
              'isvideo',
              'labels',
              'meta_description',
              'meta_keywords',
              'meta_title',
              'show_categories',
              'slug',
              'srcvideo',
              'summary',
              'thumb',
              'title',
              'title_page',
              'trend',
              'updated_at',
              'writer',
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
