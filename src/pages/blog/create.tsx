import { CreateBlog } from 'components'
import { useFetchAll } from 'hooks'
import { GetServerSideProps } from 'next'
import React from 'react'
import { PermissionEnum } from 'types'
import { $_get_categories, asyncHas, getTagsList } from 'utils'

const Create = () => <CreateBlog />

export default Create

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  const params = context?.query

  const tags = await getTagsList(params, token)

  if (token) {
    if (!(await asyncHas(PermissionEnum.editBlog, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    return {
      props: {
        initialState: {
          tags,
          storeWorks: true,
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
