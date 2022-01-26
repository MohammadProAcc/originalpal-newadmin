import { editBrand, removeItem, useStore } from 'utils'
import Layout from 'Layouts'
import { Card, CardBody, CardHeader, InputGroup, Modal } from '@paljs/ui'
import { Button, deleteBrand, FlexContainer, HeaderButton, ModalBox } from 'components'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import router from 'next/router'

export const EditBrandPage: React.FC = () => {
  const { brand } = useStore((state: any) => ({
    brand: state?.brand,
  }))

  const [loading, setLoading] = useState(false)

  const { register, handleSubmit } = useForm({
    defaultValues: brand,
  })

  const onSubmit = async (form: any) => {
    setLoading(true)

    delete form.id
    delete form.created_at
    delete form.updated_at
    const response = await editBrand(brand?.id, form)
    console.log(response)
    if (response?.status === 'success') {
      toast.success('برند بروز شد')
    } else {
      toast.error('بروزرسانی برند موفقیت آمیز نبود')
    }

    setLoading(false)
  }

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('brands', removeId, deleteBrand, () => router.push('/brands'), [
      `برند ${removeId} با موفقیت حذف شد`,
      'حذف برند موفقیت آمیز نبود',
    ])
  }

  return (
    <Layout title={`ویرایش برند ${brand?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>
        ویرایش برند {brand?.name}
        <FlexContainer style={{ display: 'inline-flex' }}>
          <HeaderButton status="Info" href={`/brands/${brand?.id}`}>
            مشاهده
          </HeaderButton>

          <HeaderButton status="Danger" onClick={() => setItemToRemove(brand)}>
            حذف
          </HeaderButton>
        </FlexContainer>
      </h1>

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          آیا از حذف برند {itemToRemove?.id} اطمینان دارید؟
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
          <CardHeader>نام برند</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('name', { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>عنوان صفحه</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('title_page')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>عنوان متا</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('meta_title')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>توضیحات متا</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('meta_description')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>کلمات کلیدی متا</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('meta_keywords')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>متن برچسب</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('tagtext')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Button status="Info" type="submit" appearance="outline" disabled={loading}>
          بروزرسانی برند
        </Button>
      </form>
    </Layout>
  )
}
