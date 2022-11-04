import { AggregateDiscountingPage } from 'components'
import { GetServerSideProps } from 'next'
import { PermissionEnum } from 'types'
import { admin, asyncHas } from 'utils'

export default function Page() {
  return <AggregateDiscountingPage />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]

  if (token) {
    if (!(await asyncHas(PermissionEnum.editCoupon, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const stocks = await admin(token).get('/stock/select')

    return {
      props: {
        initialState: {
          stocks: stocks.data.data,
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
