import { BrandsPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getBrandsList } from 'utils'

const PageName: NextPage = () => {
  return <BrandsPage />
}

export default PageName

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!(await asyncHas(PermissionEnum.browseBrand, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const brands = await getBrandsList(context?.query, context?.req?.cookies?.[process.env.TOKEN!])
    return {
      props: {
        initialState: {
          brands,
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
