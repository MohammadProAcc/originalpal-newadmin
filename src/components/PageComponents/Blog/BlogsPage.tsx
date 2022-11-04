import React, { useState } from 'react'
import styled from 'styled-components'
import { useStore, deleteBlog, pluralRemove, useUserStore, has } from 'utils'
import Layout from 'Layouts'
import { Button, Container, Modal } from '@paljs/ui'
import { BasicTable, FlexContainer, HeaderButton, PaginationBar, SearchBar } from 'components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Add } from '@material-ui/icons'
import { toast } from 'react-toastify'
import { PermissionEnum } from 'types'

export const BlogsPage = () => {
  const router = useRouter()

  const { blog, clearList } = useStore((state) => ({
    blog: state?.blog,
    clearList: state?.clearList,
  }))
  const permissions = useUserStore().getPermissions()

  const [loading, setLoading] = useState(false)

  const [itemToRemove, setItemToRemove] = useState<any>(null)

  const toggleModal = () => setItemToRemove(null)

  const removeItem = async (item: any) => {
    setLoading(true)
    const response = await deleteBlog(item?.id)
    if (response?.status === 'success') {
      clearList('blog', item?.id)
      setItemToRemove(null)
      toast.success('وبلاگ با موفقیت حذف شد')
    } else {
      toast.error('حذف وبلاگ موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  const [tableSelections, setTableSelections] = useState<number[] | []>([])

  const [itemsToRemove, setItemsToRemove] = useState<any>(null)
  const togglePluralRemoveModal = () => setItemsToRemove(null)

  const pluralRemoveTrigger = async (selections: any[]) => {
    await pluralRemove(
      'blog',
      selections,
      deleteBlog,
      (entity: string, id: any) => {
        clearList(entity, id)
        toast.success(`مورد با شناسه ${id} حذف شد`)
      },
      async () => {
        setTableSelections([])
        setItemsToRemove(null)
      },
      (id: number) => toast.error(`حذف  وبلاگ با  شناسه ${id} موفقیت آمیز نبود`),
    )
  }

  const columns: any[] = ['شناسه وبلاگ', 'عنوان وبلاگ', 'فعالیت ها']

  const data = blog?.data?.data?.map((blog: any) => [
    // =====>> Table Columns <<=====
    blog?.id,
    blog?.title,
    <Container>
      {has(permissions, PermissionEnum.readBlog) && (
        <Link href={`/blog/${blog?.id}`}>
          <Button style={{ marginLeft: '1rem' }} status="Info">
            مشاهده
          </Button>
        </Link>
      )}
      {has(permissions, PermissionEnum.editBlog) && (
        <Link href={`/blog/edit/${blog?.id}`}>
          <Button style={{ marginLeft: '1rem' }} status="Primary">
            ویرایش
          </Button>
        </Link>
      )}
      {has(permissions, PermissionEnum.deleteBlog) && (
        <Button status="Danger" onClick={() => setItemToRemove(blog)}>
          حذف
        </Button>
      )}
    </Container>,
  ])

  return (
    <Layout title="مقالات">
      <h1>مقالات</h1>

      <FlexContainer>
        {has(permissions, PermissionEnum.editBlog) && (
          <Link href="/blog/create">
            <Button
              style={{
                margin: '1rem 0 1rem 1rem',
                display: 'flex',
              }}
              status="Success"
              appearance="outline"
            >
              افزودن وبلاگ
              <Add />
            </Button>
          </Link>
        )}
        {tableSelections?.length > 0 && has(permissions, PermissionEnum.deleteBlog) && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </FlexContainer>

      {has(permissions, PermissionEnum.browseBlog) && (
        <>
          <SearchBar
            fields={blog.fields}
            entity="blog"
            params={router.query}
            callback={(form: any) =>
              router.push({
                pathname: '/blog/search',
                query: form,
              })
            }
          />

          <BasicTable getSelections={setTableSelections} columns={columns} rows={data} />
          <PaginationBar
            totalPages={blog?.data?.last_page}
            activePage={router.query.page ? Number(router.query.page) : 1}
            router={router}
          />
        </>
      )}
      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف وبلاگ <span className="text-danger">{`${itemToRemove?.id}`}</span> با عنوان{' '}
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
