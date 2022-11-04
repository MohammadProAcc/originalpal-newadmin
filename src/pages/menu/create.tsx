import { CreateMenu } from 'components'
import { GetServerSideProps } from 'next'
import React from 'react'
import { PermissionEnum } from 'types'
import { asyncHas } from 'utils'

const Create = () => <CreateMenu />

export default Create

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[process.env.TOKEN!]

  if (token) {
    if (!(await asyncHas(PermissionEnum.editMainPageSection, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    return {
      props: {},
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
