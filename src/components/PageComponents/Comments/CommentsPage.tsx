import React, { useState } from 'react'
import styled from 'styled-components'
import { useStore, deleteComment, editComment, toLocalDate, pluralRemove, useUserStore, has } from 'utils'
import Layout from 'Layouts'
import { Button, Container, Modal } from '@paljs/ui'
import { BasicTable, FlexContainer, HeaderButton, PaginationBar, SearchBar, AnswerCommentFormModal } from 'components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { PermissionEnum } from 'types'

export const CommentsPage = () => {
  const router = useRouter()

  const { comments, clearList, updateCommentCheck } = useStore((state) => ({
    comments: state?.comments,
    clearList: state?.clearList,
    updateCommentCheck: state?.updateCommentCheck,
  }))
  const permissions = useUserStore().getPermissions()

  const [loading, setLoading] = useState(false)

  const [itemToRemove, setItemToRemove] = useState<any>(null)

  const [tableSelections, setTableSelections] = useState<number[] | []>([])

  const [commentToReply, setShowCommentToReply] = useState<any>(null)

  function closeReplyModal() {
    setShowCommentToReply(null)
  }

  const toggleModal = () => setItemToRemove(null)

  const removeItem = async (item: any) => {
    setLoading(true)
    const response = await deleteComment(item?.id)
    if (response?.status === 'success') {
      clearList('comments', item?.id)
      setItemToRemove(null)
      toast.success('نظر با موفقیت حذف شد')
      router.back()
    } else {
      toast.error('حذف نظر موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  const checkToggle = async (commentId: number, admin_check: 1 | 0) => {
    setLoading(true)
    const response = await editComment(commentId, { admin_check })
    if (response?.status === 'success') {
      updateCommentCheck(commentId, admin_check)
      toast.success(`نظر ${commentId} ${admin_check ? 'تایید' : 'سلب تایید'} شد`)
    } else {
      toast.error('بررسی وضعیت نظر موفیت آمیز نبود')
    }
    setLoading(false)
  }

  const [itemsToRemove, setItemsToRemove] = useState<any>(null)
  const togglePluralRemoveModal = () => setItemsToRemove(null)

  const pluralRemoveTrigger = async (selections: any[]) => {
    await pluralRemove(
      'comments',
      selections,
      deleteComment,
      (entity: string, id: any) => {
        clearList(entity, id)
        toast.success(`مورد با شناسه ${id} حذف شد`)
      },
      async () => {
        setTableSelections([])
        setItemsToRemove(null)
      },
      (id: number) => toast.error(`حذف  نظر با  شناسه ${id} موفقیت آمیز نبود`),
    )
  }

  const columns: any[] = [
    'شناسه نظر',
    'شناسه کاربر',
    'شناسه محصول / مقاله',
    'متن',
    'تاریخ ایجاد',
    'تاریخ بروزسانی',
    'بروزشده در',
  ]

  const data = comments?.data?.data?.map((comment: any) => [
    // =====>> Table Columns <<=====
    comment?.id ?? '-',
    `کاربر ${comment?.user_id}` ?? '-',
    comment?.blog_id ? `مقاله ${comment?.blog_id}` : `محصول ${comment?.product_id}` ?? '-',
    comment?.content ?? '-',
    toLocalDate(comment?.created_at) ?? '-',
    toLocalDate(comment?.updated_at) ?? '-',
    <Div>
      {comment?.parent_id === null && (
        <Button
          style={{ marginLeft: '1rem' }}
          status="Success"
          appearance="outline"
          onClick={() => {
            setShowCommentToReply(comment)
          }}
        >
          پاسخ دادن {comment?.parent_id ? 'پاسخ' : 'نظر'}
        </Button>
      )}
      {has(permissions, PermissionEnum.editComment) && comment?.admin_check == 1 ? (
        <Button
          style={{ marginLeft: '1rem' }}
          status="Warning"
          appearance="outline"
          onClick={() => checkToggle(comment?.id, 0)}
        >
          سلب تایید از {comment?.parent_id ? 'پاسخ' : 'نظر'}
        </Button>
      ) : (
        <Button
          style={{ marginLeft: '1rem' }}
          status="Success"
          appearance="outline"
          onClick={() => checkToggle(comment?.id, 1)}
        >
          تایید {comment?.parent_id ? 'پاسخ' : 'نظر'}
        </Button>
      )}
      {has(permissions, PermissionEnum.readComment) && (
        <Link href={`/comments/${comment?.id}`} passHref>
          <a>
            <Button style={{ marginLeft: '1rem' }} status="Info">
              مشاهده
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.editComment) && (
        <Link href={`/comments/edit/${comment?.id}`} passHref>
          <a>
            <Button style={{ marginLeft: '1rem' }} status="Primary">
              ویرایش
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.deleteComment) && (
        <Button status="Danger" onClick={() => setItemToRemove(comment)}>
          حذف
        </Button>
      )}
    </Div>,
  ])

  return (
    <Layout title="نظرات">
      <h1>نظرات</h1>

      <FlexContainer>
        {tableSelections?.length > 0 && has(permissions, PermissionEnum.deleteAddress) && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </FlexContainer>

      {has(permissions, PermissionEnum.browseComment) && (
        <>
          <SearchBar
            fields={comments.fields}
            entity="comments"
            params={router.query}
            callback={(form: any) =>
              router.push({
                pathname: '/comments/search',
                query: form,
              })
            }
          />

          <BasicTable getSelections={setTableSelections} columns={columns} rows={data} />
          <PaginationBar
            totalPages={comments?.data?.last_page}
            activePage={router.query.page ? Number(router.query.page) : 1}
            router={router}
          />
        </>
      )}

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف نظر <span className="text-danger">{`${itemToRemove?.id}`}</span> با عنوان{' '}
          <span className="text-danger">{`${itemToRemove?.title}`}</span> اطمینان دارید؟
          <ButtonGroup>
            <Button onClick={toggleModal} style={{ marginLeft: '1rem' }}>
              خیر، منصرم شدم
            </Button>
            <Button onClick={() => removeItem(itemToRemove)} disabled={loading} status="Danger">
              بله، حذف شود
            </Button>
          </ButtonGroup>
        </ModalBox>
      </Modal>

      <Modal on={itemsToRemove} toggle={togglePluralRemoveModal}>
        <ModalBox fluid>
          آیا از حذف موارد
          <span className="text-danger mx-1">{itemsToRemove?.join(' , ')}</span>
          اطمینان دارید؟
          <ButtonGroup>
            <Button onClick={togglePluralRemoveModal} style={{ marginLeft: '1rem' }}>
              خیر، منصرم شدم
            </Button>
            <Button onClick={() => pluralRemoveTrigger(tableSelections)} disabled={loading} status="Danger">
              بله، حذف شوند
            </Button>
          </ButtonGroup>
        </ModalBox>
      </Modal>

      <AnswerCommentFormModal show={!!commentToReply} toggle={closeReplyModal} comment={commentToReply} />
    </Layout>
  )
}

const ModalBox = styled(Container)`
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: #fff;
`

const ButtonGroup = styled.div`
  margin-top: 1rem;
  display: flex;
`

const Div = styled.div`
  display: flex;
  justify-content: flex-end;
  row-gap: 1rem;
`
