import { dehydrate, QueryClient } from '@tanstack/react-query'
import { EditProductPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getAllBrands, getSingleProduct, getTagsList } from 'utils'

const SingleProduct: NextPage = () => <EditProductPage />
export default SingleProduct

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  const { product_id } = context?.query

  if (token) {
    if (!(await asyncHas(PermissionEnum.browseTag, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(['product', product_id], () => getSingleProduct(product_id as string, token))
    await queryClient.prefetchQuery(['brands'], () => getAllBrands(token))
    await queryClient.prefetchQuery(['tags'], () => getTagsList({ pages: 'total' }, token))

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
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
