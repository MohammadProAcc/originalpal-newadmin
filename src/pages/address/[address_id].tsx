import React from 'react'
import { SingleAddressPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { getSingleAddress } from 'utils'

const PageName: NextPage = () => <SingleAddressPage />
export default PageName

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const address = await getSingleAddress(context?.query?.address_id as string, context?.req?.cookies?.token)

    return {
      props: {
        initialState: {
          address: address?.data ?? null,
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
