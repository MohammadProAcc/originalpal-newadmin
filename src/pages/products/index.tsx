import { ProductsPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getProductsList } from 'utils'

const PageName: NextPage = () => <ProductsPage />

export default PageName

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]

  if (token) {
    const products = await getProductsList(context?.query, token)
    if (!(await asyncHas(PermissionEnum.browseProduct, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
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
