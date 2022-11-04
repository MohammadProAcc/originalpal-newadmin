import { PaymentsPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getPayments } from 'utils'

const Payments: NextPage = () => <PaymentsPage />

export default Payments

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!(await asyncHas(PermissionEnum.browsePayment, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }

    const payments = await getPayments(context?.query, context?.req?.cookies?.[process.env.TOKEN!])

    return {
      props: {
        initialState: {
          payments,
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
