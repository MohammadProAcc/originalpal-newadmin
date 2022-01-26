import { deleteComment, editComment, getSingleComment, removeItem, useStore } from 'utils'
import Layout from 'Layouts'
import { Card, CardBody, CardHeader, InputGroup, Modal } from '@paljs/ui'
import { Button, HeaderButton } from 'components'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import router from 'next/router'
import { FlexContainer, ModalBox } from 'components/Container'

export const EditCommentPage: React.FC = () => {
  const { comment, updateComment } = useStore((state: any) => ({
    comment: state?.comment,
    updateComment: state?.updateComment,
  }))

  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: comment,
  })

  const onSubmit = async (form: any) => {
    for (let key in form) {
      if (!dirtyFields[key]) {
        delete form[key]
      }
    }
    const response = await editComment(comment?.id, form)
    if (response?.status === 'success') {
      toast.success('نظر بروز شد')
    } else {
      toast.error('بروزرسانی نظر موفقیت آمیز نبود')
    }
  }

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
      console.log(updatedComment)
      updateComment(updatedComment)
      toast.success(`نظر ${commentId} ${admin_check ? 'تایید' : 'سلب تایید'} شد`)
    } else {
      toast.error('بررسی وضعیت نظر موفیت آمیز نبود')
    }
    setLoading(false)
  }

  console.log(comment)

  return (
    <Layout title={`${comment?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>
        نظر {comment?.id}
        <FlexContainer style={{ display: 'inline-flex' }}>
          {comment?.admin_check ? (
            <Button onClick={() => checkToggle(comment?.id, 0)} className="mr-4" status="Warning" appearance="hero">
              سلب تایید
            </Button>
          ) : (
            <Button onClick={() => checkToggle(comment?.id, 1)} className="mr-4" status="Success" appearance="outline">
              تایید نظر
            </Button>
          )}
          <HeaderButton status="Info" href={`/comments/${comment?.id}`}>
            مشاهده
          </HeaderButton>
          <HeaderButton status="Danger" onClick={() => setItemToRemove(comment)}>
            حذف
          </HeaderButton>
        </FlexContainer>
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>عنوان نظر</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('title', { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>متن نظر</CardHeader>
          <CardBody>
            <InputGroup fullWidth style={{ height: '16rem' }}>
              <textarea {...register('content', { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Button status="Info" type="submit" appearance="outline">
          بروزرسانی نظر
        </Button>
      </form>
    </Layout>
  )
}
