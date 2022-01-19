import { useStore } from 'utils';
import Layout from 'Layouts';
import { Card, CardBody, CardHeader } from '@paljs/ui';

export const SingleBlogPage: React.FC = () => {
  const { blog } = useStore((state: any) => ({
    blog: state?.blog,
  }));

  return (
    <Layout title={`${blog?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>برچسب {blog?.name}</h1>

      {/* <Card> */}
      {/*   <CardHeader>شناسه برچسب</CardHeader> */}
      {/*   <CardBody>{blog?.id}</CardBody> */}
      {/* </Card> */}
      {/**/}
      {/* <Card> */}
      {/*   <CardHeader>نام برچسب</CardHeader> */}
      {/*   <CardBody>{blog?.name}</CardBody> */}
      {/* </Card> */}
      {/**/}
      {/* <Card> */}
      {/*   <CardHeader>عنوان صفحه</CardHeader> */}
      {/*   <CardBody>{blog?.title_page ?? '-'}</CardBody> */}
      {/* </Card> */}
      {/**/}
      {/* <Card> */}
      {/*   <CardHeader>عنوان متا</CardHeader> */}
      {/*   <CardBody>{blog?.meta_title ?? '-'}</CardBody> */}
      {/* </Card> */}
      {/**/}
      {/* <Card> */}
      {/*   <CardHeader>توضیحات متا</CardHeader> */}
      {/*   <CardBody>{blog?.meta_description ?? '-'}</CardBody> */}
      {/* </Card> */}
      {/**/}
      {/* <Card> */}
      {/*   <CardHeader>کلمات کلیدی متا</CardHeader> */}
      {/*   <CardBody>{blog?.meta_keywords ?? '-'}</CardBody> */}
      {/* </Card> */}
      {/**/}
      <Card>
        <CardHeader>تاریخ ها</CardHeader>
        <CardBody>
          <Card>
            <CardHeader>ساخته شده در</CardHeader>
            <CardBody>{blog?.created_at}</CardBody>
          </Card>
          <Card>
            <CardHeader>بروز شده در</CardHeader>
            <CardBody>{blog?.updated_at}</CardBody>
          </Card>
        </CardBody>
      </Card>
    </Layout>
  );
};
