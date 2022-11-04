import { deleteTag, has, removeItem, useStore, useUserStore } from 'utils'
import Layout from 'Layouts'
import { Button, Card, CardBody, CardHeader, Modal } from '@paljs/ui'
import { useState } from 'react'
import router from 'next/router'
import { FlexContainer, HeaderButton, ModalBox } from 'components'
import { PermissionEnum } from 'types'

export const SingleTagPage: React.FC = () => {
  const { tag } = useStore((state: any) => ({
    tag: state?.tag,
  }))
  const permissions = useUserStore().getPermissions()

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
        مشاهده برچسب {tag?.name}
        {has(permissions, PermissionEnum.editTag) && (
          <HeaderButton status="Info" href={`/tags/edit/${tag?.id}`}>
            ویرایش
          </HeaderButton>
        )}
        {has(permissions, PermissionEnum.deleteTag) && (
          <HeaderButton status="Danger" onClick={() => setItemToRemove(tag)}>
            حذف
          </HeaderButton>
        )}
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
        <CardHeader>شناسه برچسب</CardHeader>
        <CardBody>{tag?.id}</CardBody>
      </Card>

      <Card>
        <CardHeader>نام برچسب</CardHeader>
        <CardBody>{tag?.name}</CardBody>
      </Card>

      {/* <Card>
        <CardHeader>عنوان صفحه</CardHeader>
        <CardBody>{tag?.title_page ?? '-'}</CardBody>
      </Card> */}

      <Card>
        <CardHeader>توضیحات</CardHeader>
        <CardBody>{tag?.description ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>عنوان متا</CardHeader>
        <CardBody>{tag?.meta_title ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>توضیحات متا</CardHeader>
        <CardBody>{tag?.meta_description ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>اولویت</CardHeader>
        <CardBody>{tag?.priority ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>تاریخ ها</CardHeader>
        <CardBody>
          <Card>
            <CardHeader>ساخته شده در</CardHeader>
            <CardBody>{tag?.created_at}</CardBody>
          </Card>
          <Card>
            <CardHeader>بروز شده در</CardHeader>
            <CardBody>{tag?.updated_at}</CardBody>
          </Card>
        </CardBody>
      </Card>
    </Layout>
  )
}
