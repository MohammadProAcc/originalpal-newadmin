import { BlogCategoriesPage } from 'components'
import { GetServerSideProps } from 'next'
import { $_get_categories } from 'utils'

export default function Page() {
  return <BlogCategoriesPage />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[process.env.TOKEN!!]

  const { data } = await $_get_categories({ token })

  return {
    props: {
      initialState: {
        blogCategories: data.data,
      },
    },
  }
}
