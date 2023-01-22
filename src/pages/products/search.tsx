import { ProductsPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, search_in } from 'utils'

const PageName: NextPage = () => <ProductsPage />
export default PageName

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!(await asyncHas(PermissionEnum.browseProduct, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const { data: result } = await search_in(
      'products',
      context.query,
      context.query,
      context.req.cookies[process.env.TOKEN!],
    )

    return {
      props: {
        initialState: {
          products: {
            data: result,
            fields: [
              'brand_id',
              'category_id',
              'code',
              'collection_id',
              'created_at',
              'description',
              'discount_exp',
              'discount_price',
              'Enable',
              'id',
              'media',
              'meta_description',
              'meta_keywords',
              'meta_title',
              'name',
              'onesize',
              'price',
              'site_main_picture',
              'slug',
              'sold',
              'state',
              'summary',
              'title',
              'title_page',
              'trend',
              'updated_at',
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
