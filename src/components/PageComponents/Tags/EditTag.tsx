import { deleteTag, editTag, removeItem, useStore } from 'utils'
import Layout from 'Layouts'
import { Card, CardBody, CardHeader, InputGroup, Modal } from '@paljs/ui'
import { Button, FlexContainer, HeaderButton, ModalBox } from 'components'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useState } from 'react'
import router from 'next/router'

export const EditTagPage: React.FC = () => {
  const { tag } = useStore((state: any) => ({
    tag: state?.tag,
  }))

  const { register, handleSubmit } = useForm({
    defaultValues: tag,
  })

  const onSubmit = async (form: any) => {
    delete form.id
    delete form.created_at
    delete form.updated_at
    const response = await editTag(tag?.id, form)
    if (response?.status === 'success') {
      toast.success('برچسب بروز شد')
    } else {
      toast.error('بروزرسانی برچسب موفقیت آمیز نبود')
    }
  }

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('tags', removeId, deleteTag, () => router.push('/tags'), [
      `برچسب ${removeId} با موفقیت حذف شد`,
      'حذف برچسب موفقیت آمیز نبود',
    ])
  }

  return (
    <Layout title={`${tag?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>
        ویرایش برچسب {tag?.name}
        <FlexContainer style={{ display: 'inline-flex' }}>
          <HeaderButton status="Info" href={`/tags/${tag?.id}`}>
            مشاهده
          </HeaderButton>

          <HeaderButton status="Danger" onClick={() => setItemToRemove(tag)}>
            حذف
          </HeaderButton>
        </FlexContainer>
      </h1>

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          آیا از حذف برچسب {itemToRemove?.id} اطمینان دارید؟
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
          <CardHeader>نام برچسب</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('name', { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>نوع برچسب</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('type')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>عنوان</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('title')} />
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
          <CardHeader>توضیحات</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('description')} />
            </InputGroup>
          </CardBody>
        </Card>

        {/* <Card> */}
        {/*   <CardHeader>اولویت</CardHeader> */}
        {/*   <CardBody> */}
        {/*     <InputGroup> */}
        {/*       <input type="number" {...register('priority')} /> */}
        {/*     </InputGroup> */}
        {/*   </CardBody> */}
        {/* </Card> */}

        <Button status="Info" type="submit" appearance="outline">
          بروزرسانی برچسب
        </Button>
      </form>
    </Layout>
  )
}
