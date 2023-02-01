import { SingleTagPage } from 'components/PageComponents/Tags/SingleTagPage'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, getSingleTag } from 'utils'

const SingleTag: NextPage = () => <SingleTagPage />
export default SingleTag

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!(await asyncHas(PermissionEnum.readTag, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const tag = await getSingleTag(context?.query?.tag_id as string, context?.req?.cookies?.[process.env.TOKEN!]!)

    return {
      props: {
        initialState: {
          tag: tag?.data,
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
