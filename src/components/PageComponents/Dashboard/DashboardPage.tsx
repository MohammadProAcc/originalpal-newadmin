import { Card as OCard, CardBody, CardHeader } from '@paljs/ui'
import { useStore, useUserStore, has } from 'utils'
import styled from 'styled-components'
import Link from 'next/link'
import Head from 'next/head'
import { Colors } from 'styles'

export const DashboardPage = () => {
  const { products, users, orders } = useStore((state: any) => ({
    products: state?.products,
    users: state?.users,
    orders: state?.orders,
  }))

  const permissions = useUserStore().getPermissions()

  return (
    <>
      <Head>
        <title>خانه | پنل ادمین اوریجینال پل</title>
      </Head>
      <H1>داشبورد</H1>
      <div style={{ display: 'flex' }}>
        {has(permissions, 'user') && (
          <Card status="Primary">
            <Link href="#">
              <a>
                <CardHeader>تعداد کاربران</CardHeader>
              </a>
            </Link>
            <CardBody>
              {users?.table?.total ?? '?'} -{' '}
              <Link href="/#">
                <a href="/#">مشاهده همه</a>
              </Link>
            </CardBody>
          </Card>
        )}

        {has(permissions, 'product') && (
          <Card status="Info">
            <CardHeader>تعداد محصولات</CardHeader>
            <CardBody>
              {products?.data?.total ?? '?'} -{' '}
              <Link href="/products">
                <a href="/products">مشاهده همه</a>
              </Link>
            </CardBody>
          </Card>
        )}

        {has(permissions, 'order') && (
          <Card status="Success">
            <Link href="/orders">
              <a>
                <CardHeader>تعداد سفارشات</CardHeader>
              </a>
            </Link>
            <CardBody>
              {orders?.data?.total ?? '?'} -{' '}
              <Link href="/orders">
                <a href="/orders">مشاهده همه</a>
              </Link>
            </CardBody>
          </Card>
        )}
      </div>
    </>
  )
}

const H1 = styled.h1`
  padding-bottom: 1rem;
  border-bottom: 1px solid ${Colors.grayBorder};
  margin-bottom: 1rem;
`
const Card = styled(OCard)`
  max-width: 20rem;
  margin-right: 1rem;
`
