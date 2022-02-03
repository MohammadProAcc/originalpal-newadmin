import { MainPageSectionPage } from 'components/PageComponents/MainPageSection'
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { search_in } from 'utils'

const PageName: NextPage = () => <MainPageSectionPage />
export default PageName
export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const { data: result } = await search_in(
      'main-page/sections',
      context.query,
      context.query,
      context.req.cookies.token,
    )

    return {
      props: {
        initialState: {
          mainPageSections: {
            data: result,
            fields: [],
          },
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
