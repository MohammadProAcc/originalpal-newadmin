import { removeItem, toLocalDate, useStore } from 'utils'
import Layout from 'Layouts'
import { Card, CardBody, CardHeader, Modal } from '@paljs/ui'
import React, { useState } from 'react'
import { Button, deleteBrand, FlexContainer, HeaderButton, ModalBox } from 'components'
import router from 'next/router'

export const SingleBrandPage: React.FC = () => {
  const { brand } = useStore((state: any) => ({
    brand: state?.brand,
  }))

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('brands', removeId, deleteBrand, () => router.push('/brands'), [
      `برند ${removeId} با موفقیت حذف شد`,
      'حذف برند موفقیت آمیز نبود',
    ])
  }

  return (
    <Layout title={`مشاهده برند ${brand?.id} (${brand?.name})`}>
      <h1 style={{ marginBottom: '4rem' }}>
        مشاهده برند {brand?.name}
        <HeaderButton status="Info" href={`/brands/edit/${brand?.id}`}>
          ویرایش
        </HeaderButton>
        <HeaderButton status="Danger" onClick={() => setItemToRemove(brand)}>
          حذف
        </HeaderButton>
      </h1>

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          <div style={{ marginBottom: '1rem' }}>
            آیا از حذف برند
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
            <CardBody>{toLocalDate(brand?.created_at)}</CardBody>
          </Card>
          <Card>
            <CardHeader>بروز شده در</CardHeader>
            <CardBody>{toLocalDate(brand?.updated_at)}</CardBody>
          </Card>
        </CardBody>
      </Card>
    </Layout>
  )
}
