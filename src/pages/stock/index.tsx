import { StockPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getStocksList } from 'utils'

const PageName: NextPage = () => <StockPage />

export default PageName

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!(await asyncHas(PermissionEnum.browseStock, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const stocks = await getStocksList(context?.query, context?.req?.cookies?.[process.env.TOKEN!])
    console.log(stocks)
    return {
      props: {
        initialState: {
          stocks,
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
