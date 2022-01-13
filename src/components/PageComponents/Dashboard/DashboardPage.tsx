import { Card as OCard, CardBody, CardHeader } from '@paljs/ui';
import { useStore } from 'utils';
import styled from 'styled-components';

export const DashboardPage = () => {
  const { products, users, orders } = useStore((state: any) => ({
    products: state?.products,
    users: state?.users,
    orders: state?.orders,
  }));

  return (
    <div style={{ display: 'flex' }}>
      <Card status="Primary">
        <CardHeader>تعداد کاربران</CardHeader>
        <CardBody>{users?.table?.total ?? '?'}</CardBody>
      </Card>

      <Card status="Info">
        <CardHeader>تعداد محصولات</CardHeader>
        <CardBody>{products?.data?.total ?? '?'}</CardBody>
      </Card>

      <Card status="Success">
        <CardHeader>تعداد سفارشات</CardHeader>
        <CardBody>{orders?.data?.total ?? '?'}</CardBody>
      </Card>
    </div>
  );
};

const Card = styled(OCard)`
  max-width: 20rem;
  margin-right: 1rem;
`;
