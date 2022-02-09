import React, { useState } from 'react'
import styled from 'styled-components'
import { useStore, deleteUser, translator, pluralRemove } from 'utils'
import Layout from 'Layouts'
import { Button, Container, Modal } from '@paljs/ui'
import { BasicTable, FlexContainer, HeaderButton, PaginationBar, SearchBar } from 'components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Add } from '@material-ui/icons'
import { toast } from 'react-toastify'

export const UsersPage = () => {
  const router = useRouter()

  const { users, clearList } = useStore((state) => ({
    users: state?.users,
    clearList: state?.clearList,
  }))

  const [loading, setLoading] = useState(false)

  const [itemToRemove, setItemToRemove] = useState<any>(null)

  const [tableSelections, setTableSelections] = useState<number[] | []>([])

  const toggleModal = () => setItemToRemove(null)

  const removeItem = async (item: any) => {
    setLoading(true)
    const response = await deleteUser(item?.id)
    if (response?.status === 'success') {
      clearList('users', item?.id)
      setItemToRemove(null)
      toast.success('کاربر با موفقیت حذف شد')
    } else {
      toast.error('حذف کاربر موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  const [itemsToRemove, setItemsToRemove] = useState<any>(null)
  const togglePluralRemoveModal = () => setItemsToRemove(null)

  const pluralRemoveTrigger = async (selections: any[]) => {
    await pluralRemove(
      'users',
      selections,
      deleteUser,
      (entity: string, id: any) => {
        clearList(entity, id)
        toast.success(`مورد با شناسه ${id} حذف شد`)
      },
      async () => {
        setTableSelections([])
        setItemsToRemove(null)
      },
      (id: number) => toast.error(`حذف کاربر با شناسه ${id} موفقیت آمیز نبود`),
    )
  }

  const columns: any[] = ['شناسه کاربر', 'نام کاربر', 'نام خانوادگی', 'ایمیل', 'شماره تلفن کاربر', 'نقش', 'فعالیت ها']

  const data = users?.data?.data?.map((user: any) => [
    // =====>> Table Columns <<=====
    user?.id,
    user?.name,
    user?.lastname ?? '-',
    user?.email,
    user?.phone,
    translator(user?.role),
    <Container>
      <Link href={`/users/${user?.id}`}>
        <Button style={{ marginLeft: '1rem' }} status="Info">
          مشاهده
        </Button>
      </Link>
      <Link href={`/users/edit/${user?.id}`}>
        <Button style={{ marginLeft: '1rem' }} status="Primary">
          ویرایش
        </Button>
      </Link>
      <Button status="Danger" onClick={() => setItemToRemove(user)}>
        حذف
      </Button>
    </Container>,
  ])

  return (
    <Layout title="کاربران">
      <h1>کاربر ها</h1>

      <FlexContainer>
        <Link href="/users/create">
          <Button
            style={{
              margin: '1rem 0 1rem 1rem',
              display: 'flex',
            }}
            status="Success"
            appearance="outline"
          >
            افزودن کاربر
            <Add />
          </Button>
        </Link>
        {tableSelections?.length > 0 && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </FlexContainer>

      <SearchBar
        fields={users.fields}
        entity="users"
        params={router.query}
        callback={(form: any) =>
          router.push({
            pathname: '/users/search',
            query: form,
          })
        }
      />

      <BasicTable getSelections={setTableSelections} columns={columns} rows={data} />
      <PaginationBar
        totalPages={users?.data?.last_page}
        activePage={router.query.page ? Number(router.query.page) : 1}
        router={router}
      />

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف کاربر <span className="text-danger">{`${itemToRemove?.id}`}</span> با نام{' '}
          <span className="text-danger">{`${itemToRemove?.name} ${itemToRemove?.lastname ?? ''}`}</span> اطمینان دارید؟
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
