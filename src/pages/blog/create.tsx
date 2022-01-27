import { CreateBlog } from 'components'
import { GetServerSideProps } from 'next'
import React from 'react'
import { getTagsList } from 'utils'

const Create = () => <CreateBlog />

export default Create

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.token
  const params = context?.query

  const tags = await getTagsList(params, token)
  console.log('tags', tags)

  if (token) {
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
