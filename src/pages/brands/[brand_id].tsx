import { SingleBrandPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getSingleBrand } from 'utils'

const SingleBrand: NextPage = () => <SingleBrandPage />
export default SingleBrand

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!(await asyncHas(PermissionEnum.readBrand, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const brand = await getSingleBrand(context?.query?.brand_id as string, context?.req?.cookies?.[process.env.TOKEN!])

    return {
      props: {
        initialState: {
          brand: brand?.data,
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
