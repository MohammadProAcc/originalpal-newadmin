import { EditProductPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getAllBrands, getBrandsList, getSingleProduct } from 'utils'

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
    const product = await getSingleProduct(product_id as string, token)
    const brands = await getAllBrands(token)

    return {
      props: {
        initialState: {
          product,
          brands: brands && brands.data,
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
