import { Banners } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { search_in } from 'utils'

const Main: NextPage = () => <Banners />
export default Main

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context?.req?.cookies?.[process.env.TOKEN!]) {
    return {
      props: {},
      redirect: {
        destination: '/auth/login',
      },
    }
  } else {
    const { data: result } = await search_in(
      'banners',
      { key: 'type', type: '=', value: 'stand' },
      context.query,
      context.req.cookies[process.env.TOKEN!],
    )

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
  }
}
