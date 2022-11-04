import { EditAddressPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getSingleAddress } from 'utils'

const SingleAddress: NextPage = () => <EditAddressPage />
export default SingleAddress

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!asyncHas(PermissionEnum.editAddress, token))
      return {
        props: {},
        redirect: '/dashboard',
      }
    const address = await getSingleAddress(
      context?.query?.address_id as string,
      context?.req?.cookies?.[process.env.TOKEN!],
    )

    return {
      props: {
        initialState: {
          address: address.data ?? null,
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
