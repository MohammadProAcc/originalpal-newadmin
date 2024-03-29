import { Alert, Card, CardBody, CardHeader, Modal } from '@paljs/ui'
import { Button, Dot, FlexContainer, HeaderButton, ModalBox } from 'components'
import { DatesCard } from 'components/Card/DatesCard'
import Layout from 'Layouts'
import router from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'
import { removeItem, translator, useStore } from 'utils'
import { deleteBanner } from 'utils/api/REST/actions/banners'

export const MainPage: React.FC = () => {
  const { banner } = useStore((state: any) => ({
    banner: state?.banner,
  }))

  const [loading, setLoading] = useState(false)

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('banners', removeId, deleteBanner, () => router.push('/main-page'), [
      `بنر ${removeId} با موفقیت حذف شد`,
      'حذف بنر موفقیت آمیز نبود',
    ])
  }

  return (
    <Layout title="بنر صفحه اصلی">
      <h1 style={{ marginBottom: '3rem' }}>
        مشاهده بنر شماره {banner?.id ?? '?'}
        <HeaderButton status="Info" href={`/main-page/edit/${banner?.id}`}>
          ویرایش
        </HeaderButton>
        <HeaderButton status="Danger" onClick={() => setItemToRemove(banner)}>
          حذف
        </HeaderButton>
      </h1>

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          <div style={{ marginBottom: '1rem' }}>
            آیا از حذف بنر
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
        <CardHeader>عنوان</CardHeader>
        <CardBody>{banner?.title}</CardBody>
      </Card>

      <Card>
        <CardHeader>رنگ عنوان</CardHeader>
        <CardBody>
          {
            <span>
              <Dot color={banner?.title_color} /> {banner?.title_color}{' '}
            </span>
          }
        </CardBody>
      </Card>

      <Card>
        <CardHeader>محتوا</CardHeader>
        <CardBody>{banner?.content}</CardBody>
      </Card>

      <Card>
        <CardHeader>رنگ محتوا</CardHeader>
        <CardBody>
          {
            <span>
              <Dot color={banner?.content_color} /> {banner?.content_color}{' '}
            </span>
          }
        </CardBody>
      </Card>

      <Card>
        <CardHeader>لینک</CardHeader>
        <CardBody>{banner?.link}</CardBody>
      </Card>

      <Card>
        <CardHeader>پلتفرم</CardHeader>
        <CardBody>{translator(banner?.platform)}</CardBody>
      </Card>

      <Card>
        <CardHeader>اولویت</CardHeader>
        <CardBody>{banner?.priority}</CardBody>
      </Card>

      <Card>
        <CardHeader>فعال بودن بنر</CardHeader>
        <CardBody>
          {banner?.active ? <Alert status="Success">فعال</Alert> : <Alert status="Danger">غیرفعال</Alert>}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>تصویر بنر</CardHeader>
        <CardBody>
          <Image width="1600" height="900" src={`${process?.env.SRC}/${banner?.media?.u ?? ''}`} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>تگ های تصویر</CardHeader>
        <CardBody style={{ display: 'flex', flexDirection: 'column' }}>
          <span>تگ alt : {banner?.media?.a}</span>
          <span>تگ title : {banner?.media?.t}</span>
        </CardBody>
      </Card>

      <DatesCard createdAt={banner?.created_at} updatedAt={banner?.updated_at} />
    </Layout>
  )
}

const Image = styled.img`
  object-fit: cover;
`
