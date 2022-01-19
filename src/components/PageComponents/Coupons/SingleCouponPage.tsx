import { useStore } from 'utils';
import Layout from 'Layouts';
import { Card, CardBody, CardHeader } from '@paljs/ui';

export const SingleCouponPage: React.FC = () => {
  const { coupon } = useStore((state: any) => ({
    coupon: state?.coupon,
  }));

  return (
    <Layout title={`${coupon?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>کوپن {coupon?.id}</h1>

      <Card>
        <CardHeader>شناسه کوپن</CardHeader>
        <CardBody>{coupon?.id ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>کد</CardHeader>
        <CardBody>{coupon?.code ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>توضیحات</CardHeader>
        <CardBody>{coupon?.decription ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>نوع</CardHeader>
        <CardBody>{coupon?.type ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>مقدار</CardHeader>
        <CardBody>{coupon?.amount ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>شروع</CardHeader>
        <CardBody>{coupon?.start ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>انقضاء</CardHeader>
        <CardBody>{coupon?.expiration ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>حداقل قیمت برای اعمال</CardHeader>
        <CardBody>{coupon?.id ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>حداکثر</CardHeader>
        <CardBody>{coupon?.max ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>deny_off</CardHeader>
        <CardBody>{coupon?.deny_off ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>محدودیت</CardHeader>
        <CardBody>{coupon?.limit ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>شناسه کاربر</CardHeader>
        <CardBody>{coupon?.user_id ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>تاریخ ها</CardHeader>
        <CardBody>
          <Card>
            <CardHeader>ساخته شده در</CardHeader>
            <CardBody>{coupon?.created_at ?? '-'}</CardBody>
          </Card>

          <Card>
            <CardHeader>بروز شده در</CardHeader>
            <CardBody>{coupon?.updated_at ?? '-'}</CardBody>
          </Card>

          <Card>
            <CardHeader>حذف شده در</CardHeader>
            <CardBody>{coupon?.delelted_at ?? '-'}</CardBody>
          </Card>
        </CardBody>
      </Card>
    </Layout>
  );
};
