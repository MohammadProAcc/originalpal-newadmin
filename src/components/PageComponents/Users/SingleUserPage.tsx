import { translator, useStore } from 'utils';
import Layout from 'Layouts';
import { Card, CardBody, CardHeader } from '@paljs/ui';

export const SingleUserPage: React.FC = () => {
  const { user } = useStore((state: any) => ({
    user: state?.user,
  }));

  return (
    <Layout title={`${user?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>کاربر {user?.name}</h1>

      <Card>
        <CardHeader>شناسه کاربر</CardHeader>
        <CardBody>{user?.id}</CardBody>
      </Card>

      <Card>
        <CardHeader>نام</CardHeader>
        <CardBody>{user?.name}</CardBody>
      </Card>

      <Card>
        <CardHeader>نام خانوادگی</CardHeader>
        <CardBody>{user?.lastname ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>ایمیل</CardHeader>
        <CardBody>{user?.email ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>زمان ثبت نام</CardHeader>
        <CardBody>{user?.created_at ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>وضعیت (فعال)</CardHeader>
        <CardBody>{user?.status ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>نقش</CardHeader>
        <CardBody>{translator(user?.role) ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>شماره تلفن</CardHeader>
        <CardBody>{user?.phone_number ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>تاریخ ها</CardHeader>
        <CardBody>
          <Card>
            <CardHeader>ساخته شده در</CardHeader>
            <CardBody>{user?.created_at}</CardBody>
          </Card>
          <Card>
            <CardHeader>بروز شده در</CardHeader>
            <CardBody>{user?.updated_at}</CardBody>
          </Card>
        </CardBody>
      </Card>
    </Layout>
  );
};
