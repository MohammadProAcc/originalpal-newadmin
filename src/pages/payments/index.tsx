import { PaymentsPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { getPayments } from 'utils'

const Payments: NextPage = () => <PaymentsPage />

export default Payments

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const payments = await getPayments(context?.query, context?.req?.cookies?.token)

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
