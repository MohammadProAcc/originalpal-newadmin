import { AddressesPage } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { search_in } from 'utils'

const SearchAddresses: NextPage = () => <AddressesPage />
export default SearchAddresses

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const { data: addresses } = await search_in(
      'address',
      {
        key: context?.query?.key,
        type: context?.query?.type,
        value: context?.query?.value,
      },
      context.query,
      context.req.cookies.token,
    )

    return {
      props: {
        initialState: {
          addresses: {
            data: addresses,
            fields: ['id', 'postalcode', 'city', 'address', 'province', 'user_id', 'created_at', 'updated_at'],
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
