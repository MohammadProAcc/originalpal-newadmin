import React, { useState } from 'react'
import styled from 'styled-components'
import { useStore, deleteTag, pluralRemove, useUserStore, has } from 'utils'
import Layout from 'Layouts'
import { Button, Container, Modal } from '@paljs/ui'
import { BasicTable, FlexContainer, HeaderButton, PaginationBar, SearchBar } from 'components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Add } from '@material-ui/icons'
import { toast } from 'react-toastify'
import { PermissionEnum } from 'types'

export const TagsPage = () => {
  const router = useRouter()

  const { tags, clearList } = useStore((state) => ({
    tags: state?.tags,
    clearList: state?.clearList,
  }))
  const permissions = useUserStore().getPermissions()

  const [loading, setLoading] = useState(false)

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const [itemsToRemove, setItemsToRemove] = useState<any>(null)

  const [tableSelections, setTableSelections] = useState<number[] | []>([])

  const toggleModal = () => setItemToRemove(null)
  const togglePluralRemoveModal = () => setItemsToRemove(null)

  const removeItem = async (item: any) => {
    setLoading(true)
    const response = await deleteTag(item?.id)
    if (response?.status === 'success') {
      clearList('tags', item?.id)
      setItemToRemove(null)
      toast.success('برچسب با موفقیت حذف شد')
    } else {
      toast.error('حذف برچسب موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  const pluralRemoveTrigger = async (selections: any[]) => {
    await pluralRemove(
      'tags',
      selections,
      deleteTag,
      (entity: string, id: any) => {
        clearList(entity, id)
        toast.success(`مورد با شناسه ${id} حذف شد`)
      },
      async () => {
        await setTableSelections([])
        setItemsToRemove(null)
      },
      (id: number) => toast.error(`حذف برچسب با شناسه ${id} موفقیت آمیز نبود`),
    )
  }

  const columns: any[] = ['شناسه برچسب', 'نام برچسب', 'نوع برچسب', 'فعالیت ها']

  const data = tags?.data?.data?.map((tag: any) => [
    // =====>> Table Columns <<=====
    tag?.id,
    tag?.name,
    tag?.type,
    <Container>
      {has(permissions, PermissionEnum.readTag) && (
        <Link href={`/tags/${tag?.id}`}>
          <a>
            <Button style={{ marginLeft: '1rem' }} status="Info">
              مشاهده
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.editTag) && (
        <Link href={`/tags/edit/${tag?.id}`}>
          <a>
            <Button style={{ marginLeft: '1rem' }} status="Primary">
              ویرایش
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.deleteTag) && (
        <Button status="Danger" onClick={() => setItemToRemove(tag)}>
          حذف
        </Button>
      )}
    </Container>,
  ])

  return (
    <Layout title="برچسب ها">
      <h1>برچسب ها</h1>

      <FlexContainer>
        {has(permissions, PermissionEnum.addTag) && (
          <Link href="/tags/create">
            <a>
              <Button
                style={{
                  margin: '1rem 0 1rem 1rem',
                  display: 'flex',
                }}
                status="Success"
                appearance="outline"
              >
                افزودن برچسب
                <Add />
              </Button>
            </a>
          </Link>
        )}
        {tableSelections?.length > 0 && has(permissions, PermissionEnum.deleteTag) && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </FlexContainer>

      {has(permissions, PermissionEnum.browseTag) && (
        <>
          <SearchBar
            fields={tags.fields}
            entity="tags"
            params={router.query}
            callback={(form: any) =>
              router.push({
                pathname: '/tags/search',
                query: form,
              })
            }
          />

          <BasicTable getSelections={setTableSelections} columns={columns} rows={data} />
          <PaginationBar
            totalPages={tags?.data?.last_page}
            activePage={router.query.page ? Number(router.query.page) : 1}
            router={router}
          />
        </>
      )}

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف برچسب <span className="text-danger">{`${itemToRemove?.id}`}</span> با عنوان{' '}
          <span className="text-danger">{`${itemToRemove?.name}`}</span> اطمینان دارید؟
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
