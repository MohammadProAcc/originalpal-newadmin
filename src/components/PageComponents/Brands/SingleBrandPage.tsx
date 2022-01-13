import { useStore } from 'utils';
import Layout from 'Layouts';
import { Card, CardBody, CardHeader } from '@paljs/ui';

export const SingleBrandPage: React.FC = () => {
  const { brand } = useStore((state: any) => ({
    brand: state?.brand,
  }));

  return (
    <Layout title={`${brand?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>برند {brand?.name}</h1>

      <Card>
        <CardHeader>شناسه برند</CardHeader>
        <CardBody>{brand?.id}</CardBody>
      </Card>

      <Card>
        <CardHeader>نام برند</CardHeader>
        <CardBody>{brand?.name}</CardBody>
      </Card>

      <Card>
        <CardHeader>عنوان صفحه</CardHeader>
        <CardBody>{brand?.title_page ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>عنوان متا</CardHeader>
        <CardBody>{brand?.meta_title ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>توضیحات متا</CardHeader>
        <CardBody>{brand?.meta_description ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>کلمات کلیدی متا</CardHeader>
        <CardBody>{brand?.meta_keywords ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>تاریخ ها</CardHeader>
        <CardBody>
          <Card>
            <CardHeader>ساخته شده در</CardHeader>
            <CardBody>{brand?.created_at}</CardBody>
          </Card>
          <Card>
            <CardHeader>بروز شده در</CardHeader>
            <CardBody>{brand?.updated_at}</CardBody>
          </Card>
        </CardBody>
      </Card>
    </Layout>
  );
};
