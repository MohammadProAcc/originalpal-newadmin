import { CreateBanner } from 'components'
import { GetServerSideProps } from 'next'
import React from 'react'
import { PermissionEnum } from 'types'
import { asyncHas } from 'utils'

const Create = () => <CreateBanner />

export default Create

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[process.env.TOKEN!]
  if (!token) {
    return {
      props: {},
      redirect: {
        destination: '/auth/login',
      },
    }
  } else {
    if (!(await asyncHas(PermissionEnum.editStand, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    return {
      props: {},
    }
  }
}
