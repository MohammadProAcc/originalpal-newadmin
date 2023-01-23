import { Add } from '@material-ui/icons'
import { Button, Container, Modal } from '@paljs/ui'
import { BasicTable, BlogCategoryModal, FlexContainer, HeaderButton, PaginationBar, SearchBar } from 'components'
import Layout from 'Layouts'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { BlogCategory, PermissionEnum } from 'types'
import { deleteBlog as deleteBlogCategory, has, pluralRemove, useStore, useUserStore } from 'utils'

export const BlogCategoriesPage = () => {
  const router = useRouter()

  const { blogCategories, clearList } = useStore((state) => ({
    blogCategories: state?.blogCategories,
    clearList: state?.clearList,
  }))
  const permissions = useUserStore().getPermissions()

  const [loading, setLoading] = useState(false)

  const [itemToRemove, setItemToRemove] = useState<BlogCategory | null>(null)
  const [itemToEdit, setItemToEdit] = useState<BlogCategory | null>(null)
  const [itemToShow, setItemToShow] = useState<BlogCategory | null>(null)
  const [showCreationModal, setShowCreationModal] = useState(false)

  const toggleRemoveModal = () => setItemToRemove(null)
  const toggleEditModal = () => setItemToEdit(null)
  const toggleShowModal = () => setItemToShow(null)
  const toggleCreationModal = () => setShowCreationModal((_state) => !_state)

  const removeItem = async (item: any) => {
    setLoading(true)
    const response = await deleteBlogCategory(item?.id)
    if (response?.status === 'success') {
      clearList('blogCategories', item?.id)
      setItemToRemove(null)
      toast.success('دسته‌بندی مقاله با موفقیت حذف شد')
      router.back()
    } else {
      toast.error('حذف دسته‌بندی مقاله موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  const [tableSelections, setTableSelections] = useState<number[] | []>([])

  const [itemsToRemove, setItemsToRemove] = useState<any>(null)
  const togglePluralRemoveModal = () => setItemsToRemove(null)

  const pluralRemoveTrigger = async (selections: any[]) => {
    await pluralRemove(
      'blogCategories',
      selections,
      deleteBlogCategory,
      (entity: string, id: any) => {
        clearList(entity, id)
        toast.success(`مورد با شناسه ${id} حذف شد`)
      },
      async () => {
        setTableSelections([])
        setItemsToRemove(null)
      },
      (id: number) => toast.error(`حذف  دسته‌بندی مقاله با  شناسه ${id} موفقیت آمیز نبود`),
    )
  }

  const columns: any[] = ['شناسه دسته‌بندی', 'عنوان', 'اسلاگ', 'محتوا', 'تعداد مقالات', 'فعالیت ها']

  const data = blogCategories?.data?.data?.map((blogCategory: BlogCategory) => [
    // =====>> Table Columns <<=====
    blogCategory?.id,
    blogCategory?.title,
    blogCategory?.slug,
    blogCategory?.content,
    blogCategory?.blog?.length,
    <Container>
      {has(permissions, PermissionEnum.readBlogCategory) && (
        <Button style={{ marginLeft: '1rem' }} status="Info" onClick={() => setItemToShow(blogCategory)}>
          مشاهده
        </Button>
      )}
      {has(permissions, PermissionEnum.editBlogCategory) && (
        <Button style={{ marginLeft: '1rem' }} status="Primary" onClick={() => setItemToEdit(blogCategory)}>
          ویرایش
        </Button>
      )}
      {has(permissions, PermissionEnum.deleteBlogCategory) && (
        <Button status="Danger" onClick={() => setItemToRemove(blogCategory)}>
          حذف
        </Button>
      )}
    </Container>,
  ])

  return (
    <Layout title="دسته بندی مقالات">
      <h1>دسته بندی مقالات</h1>

      <FlexContainer>
        {has(permissions, PermissionEnum.editBlog) && (
          <Button
            style={{
              margin: '1rem 0 1rem 1rem',
              display: 'flex',
            }}
            status="Success"
            appearance="outline"
            onClick={toggleCreationModal}
          >
            افزودن دسته‌بندی مقاله <Add />
          </Button>
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
            fields={blogCategories.fields}
            entity="categories"
            params={router.query}
            callback={(form: any) =>
              router.push({
                pathname: '/blog-categories/search',
                query: form,
              })
            }
          />

          <BasicTable getSelections={setTableSelections} columns={columns} rows={data} />
          <PaginationBar
            totalPages={blogCategories?.data?.last_page}
            activePage={router.query.page ? Number(router.query.page) : 1}
            router={router}
          />
        </>
      )}
      <Modal on={!!itemToRemove} toggle={toggleRemoveModal}>
        <ModalBox fluid>
          آیا از حذف دسته‌بندی مقاله<span className="text-danger">{`${itemToRemove?.id}`}</span> با عنوان{' '}
          <span className="text-danger">{`${itemToRemove?.title}`}</span> اطمینان دارید؟
          <ButtonGroup>
            <Button onClick={toggleRemoveModal} style={{ marginLeft: '1rem' }}>
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

      <BlogCategoryModal onClose={toggleCreationModal} opened={showCreationModal} />
      <BlogCategoryModal onClose={toggleEditModal} opened={!!itemToEdit} defaultValues={itemToEdit} />
      <BlogCategoryModal onClose={toggleShowModal} opened={!!itemToShow} defaultValues={itemToShow} readOnly />
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
