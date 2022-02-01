import { EditProductPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { getAllBrands, getBrandsList, getSingleProduct } from 'utils'

const SingleProduct: NextPage = () => <EditProductPage />
export default SingleProduct

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.token
  const { product_id } = context?.query

  if (context?.req?.cookies?.token) {
    const product = await getSingleProduct(product_id as string, token)
    // const brands = await getBrandsList(context?.query, context?.req?.cookies?.token);
    const brands = await getAllBrands(token)
    console.log(brands)

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
