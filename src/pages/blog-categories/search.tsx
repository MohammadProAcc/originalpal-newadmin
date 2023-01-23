import { BlogCategoriesPage } from 'components'
import { GetServerSideProps } from 'next'
import { PermissionEnum } from 'types'
import { $_get_categories, asyncHas, search_in } from 'utils'

export default function Page() {
  return <BlogCategoriesPage />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[process.env.TOKEN!!]

  if (token) {
    if (!(await asyncHas(PermissionEnum.browseBlogCategory, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const { data: blogCategories } = await search_in(
      'categories',
      {
        key: context?.query?.key,
        type: context?.query?.type,
        value: context?.query?.value,
      },
      context.query,
      token,
    )

    return {
      props: {
        initialState: {
          blogCategories,
        },
      },
    }
  } else {
    return {
      props: {},
      redirect: {
        destination: '/dashboard',
      },
    }
  }
}
