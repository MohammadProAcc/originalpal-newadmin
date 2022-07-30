import { AddressesPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { getAddressList } from 'utils'

const Addresses: NextPage = () => <AddressesPage />

export default Addresses

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const addresses = await getAddressList(context?.query, context?.req?.cookies?.token)

    console.log(addresses.fields)

    return {
      props: {
        initialState: {
          addresses,
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
