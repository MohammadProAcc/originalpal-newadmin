import { SendSms } from 'components'
import { GetServerSideProps } from 'next'
import { PermissionEnum } from 'types'
import { asyncHas } from 'utils'

export default function Page() {
  return <SendSms />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[process.env.TOKEN!]

  if (token) {
    if (!(await asyncHas(PermissionEnum.sms, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    return {
      props: {},
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
