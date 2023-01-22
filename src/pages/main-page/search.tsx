import { MainPages } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, search_in } from 'utils'

const Main: NextPage = () => <MainPages />
export default Main

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!]
  if (token) {
    if (!(await asyncHas(PermissionEnum.browseSlide, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const response = await search_in('banners', context.query, context.query, context.req.cookies[process.env.TOKEN!])
    response.data.data = response?.data?.data.filter((banner: any) => banner?.type === 'slide')

    if (!response) {
      return {
        props: {},
        redirect: {
          destination: '/main-page',
          permanent: false,
        },
      }
    }

    return {
      props: {
        initialState: {
          mainPageBanners: {
            data: response?.data,
            fields: [
              'id',
              'type',
              'platform',
              'media',
              'content',
              'content_color',
              'title_color',
              'title',
              'link',
              'priority',
              'active',
              'created_at',
              'updated_at',
            ],
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
