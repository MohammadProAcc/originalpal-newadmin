import { deleteCoupon, editCoupon, getSingleCoupon, removeItem, toLocalDate, useStore } from 'utils'
import Layout from 'Layouts'
import { Card, CardBody, CardHeader, InputGroup, Modal } from '@paljs/ui'
import { Button, FlexContainer, HeaderButton, ModalBox } from 'components'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import router from 'next/router'

export const EditCouponPage: React.FC = () => {
  const { coupon, updateCoupon } = useStore((state: any) => ({
    coupon: state?.coupon,
    updateCoupon: state?.updateCoupon,
  }))

  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: coupon,
  })

  const onSubmit = async (form: any) => {
    const response = await editCoupon(coupon?.id, form)
    if (response?.status === 'success') {
      toast.success('کوپن بروز شد')
    } else {
      toast.error('بروزرسانی کوپن موفقیت آمیز نبود')
    }
  }

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('coupons', removeId, deleteCoupon, () => router.push('/coupons'), [
      `کوپن ${removeId} با موفقیت حذف شد`,
      'حذف کوپن موفقیت آمیز نبود',
    ])
  }

  return (
    <Layout title={`ویراریش کوپن ${coupon?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>
        ویرایش کوپن {coupon?.code}
        <HeaderButton status="Info" href={`/coupons/${coupon?.id}`}>
          مشاهده
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>کد کوپن</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('code', { required: true })} placeholder="کد کوپن" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>توضیحات</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('decription', { required: true })} placeholder="توضیحات" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>نوع</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('type', { required: true })} placeholder="نوع" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>مقدار</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('amount', { required: true })} type="number" placeholder="مقدار" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>شروع : {toLocalDate(coupon?.start)}</CardHeader>
          <CardBody>
            <InputGroup>
              <input type="date" {...register('start', { required: true })} placeholder="شروع" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>انقضاء : {toLocalDate(coupon?.expiration)}</CardHeader>
          <CardBody>
            <InputGroup>
              <input type="date" {...register('expiration', { required: true })} placeholder="انقضاء" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>حداکثر</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('max', { required: true })} placeholder="حداکثر" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>deny_off</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('deny_off', { required: true })} placeholder="deny_off" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>محدودیت</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('limit', { required: true })} placeholder="محدودیت" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>شناسه کاربر</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('user_id', { required: true })} placeholder="شناسه کاربر" />
            </InputGroup>
          </CardBody>
        </Card>

        <Button status="Info" type="submit" appearance="outline">
          بروزرسانی کوپن
        </Button>
      </form>
    </Layout>
  )
}
