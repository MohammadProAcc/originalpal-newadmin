import { Button, Card, CardBody, CardHeader, Modal } from '@paljs/ui'
import { FlexContainer, HeaderButton, ModalBox } from 'components'
import { DatesCard } from 'components/Card/DatesCard'
import Layout from 'Layouts'
import router from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { PermissionEnum } from 'types'
import {
  deleteComment,
  editComment,
  getSingleComment,
  has,
  removeItem,
  toLocalDate,
  useStore,
  useUserStore,
} from 'utils'

export const SingleCommentPage: React.FC = () => {
  const { comment, updateComment } = useStore((state: any) => ({
    comment: state?.comment,
    updateComment: state?.updateComment,
  }))
  const permissions = useUserStore().getPermissions()

  const [loading, setLoading] = useState(false)

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('comments', removeId, deleteComment, () => router.push('/comments'), [
      `نظر ${removeId} با موفقیت حذف شد`,
      'حذف نظر موفقیت آمیز نبود',
    ])
  }

  const checkToggle = async (commentId: number, admin_check: 1 | 0) => {
    setLoading(true)
    const response = await editComment(commentId, { admin_check })
    if (response?.status === 'success') {
      const { data: updatedComment } = await getSingleComment(comment?.id)
      updateComment(updatedComment)
      toast.success(`نظر ${commentId} ${admin_check ? 'تایید' : 'سلب تایید'} شد`)
    } else {
      toast.error('بررسی وضعیت نظر موفیت آمیز نبود')
    }
    setLoading(false)
  }

  return (
    <Layout title={`مشاهده نظر ${comment?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>
        نظر {comment?.id}
        {has(permissions, PermissionEnum.editComment) && comment?.admin_check ? (
          <Button onClick={() => checkToggle(comment?.id, 1)} className="mr-4" status="Warning" appearance="hero">
            سلب تایید
          </Button>
        ) : (
          <Button onClick={() => checkToggle(comment?.id, 0)} className="mr-4" status="Success" appearance="outline">
            تایید نظر
          </Button>
        )}
        {has(permissions, PermissionEnum.editComment) && (
          <HeaderButton status="Info" href={`/comments/edit/${comment?.id}`}>
            ویرایش
          </HeaderButton>
        )}
        {has(permissions, PermissionEnum.deleteComment) && (
          <HeaderButton status="Danger" onClick={() => setItemToRemove(comment)}>
            حذف
          </HeaderButton>
        )}
      </h1>

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          <div style={{ marginBottom: '1rem' }}>
            آیا از حذف نظر
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
        <CardHeader>شناسه نظر</CardHeader>
        <CardBody>{comment?.id}</CardBody>
      </Card>

      <Card>
        <CardHeader>شناسه کاربر نظر</CardHeader>
        <CardBody>{comment?.user_id}</CardBody>
      </Card>

      <Card>
        <CardHeader>شناسه محصول</CardHeader>
        <CardBody>{comment?.product_id ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>عنوان نظر</CardHeader>
        <CardBody>{comment?.title ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>متن نظر</CardHeader>
        <CardBody>{comment?.content ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>تاریخ ایجاد</CardHeader>
        <CardBody>{toLocalDate(comment?.created_at) ?? '-'}</CardBody>
      </Card>

      <DatesCard createdAt={comment?.created_at} updatedAt={comment?.updated_at} />
    </Layout>
  )
}
