import Layout from 'Layouts'
import { removeItem, translator, useStore, useUserStore, has } from 'utils'
import { Alert, Card, CardBody, CardHeader, Modal } from '@paljs/ui'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Dot, FlexContainer, HeaderButton, ModalBox } from 'components'
import Image from 'next/image'
import { deleteBanner } from 'utils/api/REST/actions/banners'
import router from 'next/router'
import { PermissionEnum } from 'types'

export const Banner: React.FC = () => {
  const { banner } = useStore((state: any) => ({
    banner: state?.banner,
  }))
  const permissions = useUserStore().getPermissions()

  const [loading, setLoading] = useState(false)

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('banners', removeId, deleteBanner, () => router.push('/banners'), [
      `بنر ${removeId} با موفقیت حذف شد`,
      'حذف بنر موفقیت آمیز نبود',
    ])
  }

  return (
    <Layout title="بنر صفحه اصلی">
      <h1 style={{ marginBottom: '3rem' }}>
        مشاهده بنر شماره {banner?.id ?? '?'}
        {has(permissions, PermissionEnum.editStand) && (
          <HeaderButton status="Info" href={`/banners/edit/${banner?.id}`}>
            ویرایش
          </HeaderButton>
        )}
        {has(permissions, PermissionEnum.deleteStand) && (
          <HeaderButton status="Danger" onClick={() => setItemToRemove(banner)}>
            حذف
          </HeaderButton>
        )}
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
          <Image layout="fill" src={`${process?.env.SRC}/${banner?.media?.u ?? ''}`} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>تگ های تصویر</CardHeader>
        <CardBody style={{ display: 'flex', flexDirection: 'column' }}>
          <span>تگ alt : {banner?.media?.a}</span>
          <span>تگ title : {banner?.media?.t}</span>
        </CardBody>
      </Card>
    </Layout>
  )
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`
