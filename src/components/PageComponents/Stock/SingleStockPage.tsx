import { useStore } from 'utils';
import Layout from 'Layouts';
import { Card, CardBody, CardHeader } from '@paljs/ui';
import { Stock } from 'types';

export const SingleStockPage: React.FC = () => {
  const { stock } = useStore((state: any) => ({
    stock: state?.stock,
  }));

  return (
    <Layout title={`${stock?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>انبار {stock?.id}</h1>

      <Card>
        <CardHeader>شناسه انبار</CardHeader>
        <CardBody>{stock?.id}</CardBody>
      </Card>

      <Card>
        <CardHeader>نام انبار</CardHeader>
        <CardBody>{stock?.code}</CardBody>
      </Card>

      <Card>
        <CardHeader>شناسه محصول انبار</CardHeader>
        <CardBody>{stock?.product_id ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>توضیحات سایز</CardHeader>
        <CardBody>{stock?.disc ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>تعداد</CardHeader>
        <CardBody>{stock?.count ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>قیمت</CardHeader>
        <CardBody>{stock?.price ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>قیمت با تخفیف</CardHeader>
        <CardBody>{stock?.priceAfterDiscount ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>نوع تخفیف</CardHeader>
        <CardBody>{stock?.discount_type ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>مقدار تخفیف</CardHeader>
        <CardBody>{stock?.discount_amout ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>شروع تخفیف</CardHeader>
        <CardBody>{stock?.discount_start ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>پایان تخفیف</CardHeader>
        <CardBody>{stock?.discount_end ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>تاریخ ها</CardHeader>
        <Card>
          <CardHeader>ساخته شده در :</CardHeader>
          <CardBody>{stock?.created_at ?? '-'}</CardBody>
        </Card>
        <Card>
          <CardHeader>بروز شده شده در :</CardHeader>
          <CardBody>{stock?.updated_at ?? '-'}</CardBody>
        </Card>
      </Card>

      <Card>
        <CardHeader>محصول</CardHeader>
        <CardBody>{stock?.product ?? '-'}</CardBody>
      </Card>
    </Layout>
  );
};
