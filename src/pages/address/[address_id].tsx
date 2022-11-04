import React from 'react'
import { SingleAddressPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { asyncHas, getSingleAddress } from 'utils'
import { PermissionEnum } from 'types'

const PageName: NextPage = () => <SingleAddressPage />
export default PageName

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!asyncHas(PermissionEnum.readAddress, token))
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
