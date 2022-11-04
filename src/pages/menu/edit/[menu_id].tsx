import { EditMenuPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { PermissionEnum } from 'types'
import { asyncHas, getSingleMenu } from 'utils'

const SingleMenu: NextPage = () => <EditMenuPage />
export default SingleMenu

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]

  if (token) {
    if (!(await asyncHas(PermissionEnum.editMenu, token)))
      return {
        redirect: {
          destination: '/dashboard',
        },
        props: {},
      }

    const menu = await getSingleMenu(context?.query?.menu_id as string, context?.req?.cookies?.[process.env.TOKEN!])

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
