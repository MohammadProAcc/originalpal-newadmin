import { deleteBlog, removeItem, toLocalDate, useStore } from 'utils'
import Layout from 'Layouts'
import { Alert as _Alert, Button, Card, CardBody, CardHeader, Modal } from '@paljs/ui'
import Image from 'next/image'
import styled from 'styled-components'
import React, { useState } from 'react'
import router from 'next/router'
import { FlexContainer, HeaderButton, ModalBox } from 'components'

export const SingleBlogPage: React.FC = () => {
  const { blog } = useStore((state: any) => ({
    blog: state?.blog,
  }))

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('blog', removeId, deleteBlog, () => router.push('/blog'), [
      `وبلاگ ${removeId} با موفقیت حذف شد`,
      'حذف وبلاگ موفقیت آمیز نبود',
    ])
  }

  return (
    <Layout title={`مشاهده وبلاگ ${blog?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>
        <span style={{ marginLeft: '1rem' }}>مشاهده وبلاگ {blog?.id}</span>{' '}
        {blog?.is_news ? (
          <Alert status="Info">
            <h2
              style={{
                color: '#fff',
              }}
            >
              اخبار
            </h2>
          </Alert>
        ) : (
          <></>
        )}
        <HeaderButton status="Info" href={`/blog/edit/${blog.id}`}>
          ویرایش
        </HeaderButton>
        <HeaderButton status="Danger" onClick={() => setItemToRemove(blog)}>
          حذف
        </HeaderButton>
      </h1>

      {/* ....:::::: Removal Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          <div style={{ marginBottom: '1rem' }}>
            آیا از حذف برچسب
            <span className="mx-1">{itemToRemove?.id}</span>
            اطمینان دارید؟
          </div>
          <FlexContainer jc="space-between">
            <Button onClick={closeRemovalModal}>انصراف</Button>
            <Button onClick={() => remove(itemToRemove?.id)} status="Danger">
              حذف
            </Button>
          </FlexContainer>
        </ModalBox>
      </Modal>

      <Card>
        <CardHeader>شناسه وبلاگ</CardHeader>
        <CardBody>{blog?.id}</CardBody>
      </Card>

      <Card>
        <CardHeader>عنوان وبلاگ</CardHeader>
        <CardBody>{blog?.title}</CardBody>
      </Card>

      <Card>
        <CardHeader>هدر ها</CardHeader>
        <CardBody>{blog?.headers ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>ترند</CardHeader>
        <CardBody>{blog?.trend ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>متن وبلاگ</CardHeader>
        <CardBody dangerouslySetInnerHTML={{ __html: blog?.desc ?? '-' }} />
      </Card>

      <Card>
        <CardHeader>نویسنده</CardHeader>
        <CardBody>{blog?.weiter ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>اسلاگ</CardHeader>
        <CardBody>{blog?.slug ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>دسته بندی ها</CardHeader>
        <CardBody>{blog?.show_categories ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>برچسب ها</CardHeader>
        <CardBody>{blog?.labels ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>نظرات</CardHeader>
        <CardBody>{blog?.comments ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>تصویر پوستر</CardHeader>
        <CardBody></CardBody>
      </Card>

      <Card>
        <CardHeader>خلاصه</CardHeader>
        <CardBody dangerouslySetInnerHTML={{ __html: blog?.summary ?? '-' }} />
      </Card>

      <Card>
        <CardHeader>SEO</CardHeader>
        <CardBody>
          <Card>
            <CardHeader>عنوان (meta)</CardHeader>
            <CardBody>{blog?.meta_title ?? '-'}</CardBody>
          </Card>

          <Card>
            <CardHeader>عنوان صفحه</CardHeader>
            <CardBody>{blog?.title_page ?? '-'}</CardBody>
          </Card>

          <Card>
            <CardHeader>کلمات کلیدی (meta)</CardHeader>
            <CardBody>{blog?.meta_keywords ?? '-'}</CardBody>
          </Card>

          <Card>
            <CardHeader>توضیحات (meta)</CardHeader>
            <CardBody>{blog?.meta_description ?? '-'}</CardBody>
          </Card>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>تصویر پایانی</CardHeader>
        <CardBody>
          <Card>
            <CardHeader>تصویر پایانی</CardHeader>
            <CardBody>
              <Image layout="responsive" width="100%" height="50rem" src={`${process.env.SRC}/${blog?.endimage}`} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>عنوان تصویر پایانی</CardHeader>
            <CardBody>{blog?.endtitle ?? '-'}</CardBody>
          </Card>

          <Card>
            <CardHeader>تگ alt تصویر پایانی</CardHeader>
            <CardBody>{blog?.endalt ?? '-'}</CardBody>
          </Card>

          <Card>
            <CardHeader>متن تصویر پایانی</CardHeader>
            <CardBody>{blog?.endtext ?? '-'}</CardBody>
          </Card>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>تاریخ ها</CardHeader>
        <CardBody>
          <Card>
            <CardHeader>ساخته شده در</CardHeader>
            <CardBody>{toLocalDate(blog?.created_at)}</CardBody>
          </Card>
          <Card>
            <CardHeader>بروز شده در</CardHeader>
            <CardBody>{toLocalDate(blog?.updated_at)}</CardBody>
          </Card>
        </CardBody>
      </Card>
    </Layout>
  )
}

const Alert = styled(_Alert)`
  width: 10rem;
  display: inline-flex;
  text-align: center;
`
