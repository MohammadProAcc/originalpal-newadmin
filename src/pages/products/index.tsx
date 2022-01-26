import { ProductsPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { getProductsList } from 'utils'

const PageName: NextPage = () => <ProductsPage />

export default PageName

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.token

  if (token) {
    const products = await getProductsList(context?.query, token)
    console.log(products)
    return {
      props: {
        initialState: {
          products,
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
