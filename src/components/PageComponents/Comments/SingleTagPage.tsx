import { useStore } from 'utils';
import Layout from 'Layouts';
import { Card, CardBody, CardHeader } from '@paljs/ui';

export const SingleCommentPage: React.FC = () => {
  const { comment } = useStore((state: any) => ({
    comment: state?.comment,
  }));

  return (
    <Layout title={`${comment?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>نظر {comment?.id}</h1>

      <Card>
        <CardHeader>شناسه نظر</CardHeader>
        <CardBody>{comment?.id}</CardBody>
      </Card>

      <Card>
        <CardHeader>شناسه کاربر نظر</CardHeader>
        <CardBody>{comment?.user_id}</CardBody>
      </Card>

      <Card>
        <CardHeader>شناسه محصول</CardHeader>
        <CardBody>{comment?.product_id ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>عنوان نظر</CardHeader>
        <CardBody>{comment?.title ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>متن نظر</CardHeader>
        <CardBody>{comment?.content ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>تاریخ ایجاد</CardHeader>
        <CardBody>{comment?.created_at ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>تاریخ ها</CardHeader>
        <CardBody>
          <Card>
            <CardHeader>ساخته شده در</CardHeader>
            <CardBody>{comment?.created_at}</CardBody>
          </Card>
          <Card>
            <CardHeader>بروز شده در</CardHeader>
            <CardBody>{comment?.updated_at}</CardBody>
          </Card>
        </CardBody>
      </Card>
    </Layout>
  );
};
