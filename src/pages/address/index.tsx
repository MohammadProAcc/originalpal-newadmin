import { AddressesPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getAddressList } from 'utils'

const Addresses: NextPage = () => <AddressesPage />

export default Addresses

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!asyncHas(PermissionEnum.browseAddress, token))
      return {
        props: {},
        redirect: '/dashboard',
      }
    const addresses = await getAddressList(context?.query, context?.req?.cookies?.[process.env.TOKEN!])

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
