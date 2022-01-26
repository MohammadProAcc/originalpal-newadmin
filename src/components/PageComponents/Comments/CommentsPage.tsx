import React, { useState } from 'react'
import styled from 'styled-components'
import { useStore, deleteComment, editComment, toLocalDate, pluralRemove } from 'utils'
import Layout from 'Layouts'
import { Button, Container, Modal } from '@paljs/ui'
import { BasicTable, FlexContainer, HeaderButton, PaginationBar, SearchBar } from 'components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Add } from '@material-ui/icons'
import { toast } from 'react-toastify'

export const CommentsPage = () => {
  const router = useRouter()

  const { comments, clearList, updateCommentCheck } = useStore((state) => ({
    comments: state?.comments,
    clearList: state?.clearList,
    updateCommentCheck: state?.updateCommentCheck,
  }))

  const [loading, setLoading] = useState(false)

  const [itemToRemove, setItemToRemove] = useState<any>(null)

  const [tableSelections, setTableSelections] = useState<number[] | []>([])

  const toggleModal = () => setItemToRemove(null)

  const removeItem = async (item: any) => {
    setLoading(true)
    const response = await deleteComment(item?.id)
    if (response?.status === 'success') {
      clearList('comments', item?.id)
      setItemToRemove(null)
      toast.success('نظر با موفقیت حذف شد')
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
    )
  }

  const columns: any[] = [
    'شناسه نظر',
    'شناسه کاربر',
    'شناسه محصول',
    'متن',
    'تاریخ ایجاد',
    'تاریخ بروزسانی',
    'بروزشده در',
  ]

  const data = comments?.data?.data?.map((comment: any) => [
    // =====>> Table Columns <<=====
    comment?.id ?? '-',
    `کاربر ${comment?.user_id}` ?? '-',
    `محصول ${comment?.product_id}` ?? '-',
    comment?.content ?? '-',
    toLocalDate(comment?.created_at) ?? '-',
    toLocalDate(comment?.updated_at) ?? '-',
    <Container>
      {comment?.admin_check ? (
        <Button
          style={{ marginLeft: '1rem' }}
          status="Warning"
          appearance="outline"
          onClick={() => checkToggle(comment?.id, 0)}
        >
          سلب تایید از نظر
        </Button>
      ) : (
        <Button
          style={{ marginLeft: '1rem' }}
          status="Success"
          appearance="outline"
          onClick={() => checkToggle(comment?.id, 1)}
        >
          تایید نظر
        </Button>
      )}
      <Link href={`/comments/${comment?.id}`}>
        <Button style={{ marginLeft: '1rem' }} status="Info">
          مشاهده
        </Button>
      </Link>
      <Link href={`/comments/edit/${comment?.id}`}>
        <Button style={{ marginLeft: '1rem' }} status="Primary">
          ویرایش
        </Button>
      </Link>
      <Button status="Danger" onClick={() => setItemToRemove(comment)}>
        حذف
      </Button>
    </Container>,
  ])

  return (
    <Layout title="بنر های صفحه اصلی">
      <h1>نظر ها</h1>

      <FlexContainer>
        {tableSelections?.length > 0 && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </FlexContainer>

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
