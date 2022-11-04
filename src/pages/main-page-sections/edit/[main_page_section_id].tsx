import { EditMainPageSectionPage } from 'components/PageComponents/MainPageSection'
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { PermissionEnum } from 'types'
import { asyncHas, getSingleMainPageSection } from 'utils'

const SingleMainPageSection: NextPage = () => <EditMainPageSectionPage />
export default SingleMainPageSection

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  const id = context?.query?.main_page_section_id as string

  if (token) {
    if (!(await asyncHas(PermissionEnum.editMainPageSection, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const mainPageSection = await getSingleMainPageSection(id, token)

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
