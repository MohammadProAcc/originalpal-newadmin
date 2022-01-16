import { useStore } from 'utils';
import Layout from 'Layouts';
import { Card, CardBody, CardHeader } from '@paljs/ui';

export const SingleTagPage: React.FC = () => {
  const { tag } = useStore((state: any) => ({
    tag: state?.tag,
  }));

  return (
    <Layout title={`${tag?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>برچسب {tag?.name}</h1>

      <Card>
        <CardHeader>شناسه برچسب</CardHeader>
        <CardBody>{tag?.id}</CardBody>
      </Card>

      <Card>
        <CardHeader>نام برچسب</CardHeader>
        <CardBody>{tag?.name}</CardBody>
      </Card>

      <Card>
        <CardHeader>عنوان صفحه</CardHeader>
        <CardBody>{tag?.title_page ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>عنوان متا</CardHeader>
        <CardBody>{tag?.meta_title ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>توضیحات متا</CardHeader>
        <CardBody>{tag?.meta_description ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>کلمات کلیدی متا</CardHeader>
        <CardBody>{tag?.meta_keywords ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>تاریخ ها</CardHeader>
        <CardBody>
          <Card>
            <CardHeader>ساخته شده در</CardHeader>
            <CardBody>{tag?.created_at}</CardBody>
          </Card>
          <Card>
            <CardHeader>بروز شده در</CardHeader>
            <CardBody>{tag?.updated_at}</CardBody>
          </Card>
        </CardBody>
      </Card>
    </Layout>
  );
};
