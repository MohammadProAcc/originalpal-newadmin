import { SingleMainPageSectionPage } from 'components/PageComponents/MainPageSection'
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { getSingleMainPageSection } from 'utils'

const SingleMainPageSection: NextPage = () => <SingleMainPageSectionPage />
export default SingleMainPageSection

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.token
  const id = context?.query?.mainPageSection_id as string

  if (token) {
    const mainPageSection = await getSingleMainPageSection(id, token)
    console.log(mainPageSection)

    return {
      props: {
        initialState: {
          mainPageSection,
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
