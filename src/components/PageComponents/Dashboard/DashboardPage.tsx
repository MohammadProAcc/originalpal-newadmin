import { Card as OCard, CardBody, CardHeader } from '@paljs/ui';
import { useStore } from 'utils';
import styled from 'styled-components';
import Link from 'next/link';

export const DashboardPage = () => {
  const { products, users, orders } = useStore((state: any) => ({
    products: state?.products,
    users: state?.users,
    orders: state?.orders,
  }));

  return (
    <div style={{ display: 'flex' }}>
      <Card status="Primary">
        <Link href="#">
          <CardHeader>تعداد کاربران</CardHeader>
        </Link>
        <CardBody>
          {users?.table?.total ?? '?'} -{' '}
          <Link href="/#">
            <a href="/#">مشاهده همه</a>
          </Link>
        </CardBody>
      </Card>

      <Card status="Info">
        <CardHeader>تعداد محصولات</CardHeader>
        <CardBody>
          {products?.data?.total ?? '?'} -{' '}
          <Link href="/products">
            <a href="/products">مشاهده همه</a>
          </Link>
        </CardBody>
      </Card>

      <Card status="Success">
        <Link href="/orders">
          <CardHeader>تعداد سفارشات</CardHeader>
        </Link>
        <CardBody>
          {orders?.data?.total ?? '?'} -{' '}
          <Link href="/orders">
            <a href="/orders">مشاهده همه</a>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

const Card = styled(OCard)`
  max-width: 20rem;
  margin-right: 1rem;
`;
