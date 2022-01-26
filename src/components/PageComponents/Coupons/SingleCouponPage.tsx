import { deleteCoupon, removeItem, toLocalDate, useStore } from 'utils'
import Layout from 'Layouts'
import { Button, Card, CardBody, CardHeader, Modal } from '@paljs/ui'
import React, { useState } from 'react'
import { FlexContainer, HeaderButton, ModalBox } from 'components'
import router from 'next/router'

export const SingleCouponPage: React.FC = () => {
  const { coupon } = useStore((state: any) => ({
    coupon: state?.coupon,
  }))

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('coupons', removeId, deleteCoupon, () => router.push('/coupons'), [
      `کوپن ${removeId} با موفقیت حذف شد`,
      'حذف کوپن موفقیت آمیز نبود',
    ])
  }
  return (
    <Layout title={`مشاهده ${coupon?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>
        مشاهده کوپن {coupon?.code}
        <HeaderButton status="Info" href={`/coupons/edit/${coupon?.id}`}>
          ویرایش
        </HeaderButton>
        <HeaderButton status="Danger" onClick={() => setItemToRemove(coupon)}>
          حذف
        </HeaderButton>
      </h1>

      {/* ....:::::: Modals :::::.... */}
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
        <CardBody>{toLocalDate(coupon?.expiration) ?? '-'}</CardBody>
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
            <CardBody>{toLocalDate(coupon?.created_at) ?? '-'}</CardBody>
          </Card>

          <Card>
            <CardHeader>بروز شده در</CardHeader>
            <CardBody>{toLocalDate(coupon?.updated_at) ?? '-'}</CardBody>
          </Card>

          <Card>
            <CardHeader>حذف شده در</CardHeader>
            <CardBody>{toLocalDate(coupon?.delelted_at) ?? '-'}</CardBody>
          </Card>
        </CardBody>
      </Card>
    </Layout>
  )
}
