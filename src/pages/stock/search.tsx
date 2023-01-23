import { StockPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, search_in } from 'utils'

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
    const response = await search_in('stock', context.query, context.query, context.req.cookies[process.env.TOKEN!])

    if (!response) {
      return {
        props: {},
        redirect: {
          destination: '/stock',
          permanent: false,
        },
      }
    }

    return {
      props: {
        initialState: {
          stocks: {
            data: response?.data,
            fields: [
              'code',
              'count',
              'created_at',
              'disc',
              'discount_amout',
              'discount_end',
              'discount_start',
              'discount_type',
              'id',
              'price',
              'product_id',
              'size',
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
