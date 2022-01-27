import { EditMenuPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { getSingleMenu } from 'utils'

const SingleMenu: NextPage = () => <EditMenuPage />
export default SingleMenu

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const menu = await getSingleMenu(context?.query?.menu_id as string, context?.req?.cookies?.token)

    return {
      props: {
        initialState: {
          menu: menu?.data,
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
