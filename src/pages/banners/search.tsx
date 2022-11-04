import { Banners } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas, search_in } from 'utils'

const Main: NextPage = () => <Banners />
export default Main

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.[process.env.TOKEN!];
  if (token) {
    if (!(await asyncHas(PermissionEnum.browseStand, token)))
      return {
        props: {},
        redirect: {
          destination: "/dashboard"
        }
      }
    const { data: result } = await search_in('banners', context.query, context.query, context.req.cookies[process.env.TOKEN!])
    result.data = result?.data.filter((banner: any) => banner?.type === 'stand')

    return {
      props: {
        initialState: {
          banners: {
            data: result,
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
