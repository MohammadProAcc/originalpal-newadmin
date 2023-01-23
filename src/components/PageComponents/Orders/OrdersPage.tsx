import { Button, Container, Modal } from '@paljs/ui'
import { BasicTable, HeaderButton, PaginationBar, SearchBar } from 'components'
import Layout from 'Layouts'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { PermissionEnum } from 'types'
import { deleteOrder, has, pluralRemove, toLocalDate, toLocalTime, translator, useStore, useUserStore } from 'utils'
import { OrderNotes } from './OrderNotes'

export const OrdersPage = () => {
  const router = useRouter()

  const { orders, clearList } = useStore((state) => ({
    orders: state?.orders,
    clearList: state?.clearList,
  }))
  const permissions = useUserStore().getPermissions()

  const [loading, setLoading] = useState(false)

  const [itemToRemove, setItemToRemove] = useState<any>(null)

  const [itemsToRemove, setItemsToRemove] = useState<any>(null)
  const togglePluralRemoveModal = () => setItemsToRemove(null)

  const [tableSelections, setTableSelections] = useState<number[] | []>([])

  const toggleModal = () => setItemToRemove(null)

  const removeItem = async (item: any) => {
    setLoading(true)
    const response = await deleteOrder(item?.id)
    if (response?.status === 'success') {
      clearList('orders', item?.id)
      toggleModal()
      toast.success('سفارش با موفقیت حذف شد')
    } else {
      toast.error('عملیات حذف موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  const pluralRemoveTrigger = async (selections: any[]) => {
    await pluralRemove(
      'orders',
      selections,
      deleteOrder,
      (entity: string, id: any) => {
        clearList(entity, id)
        toast.success(`مورد با شناسه ${id} حذف شد`)
      },
      async () => {
        setTableSelections([])
        setItemsToRemove(null)
      },
      (id: number) => toast.error(`حذف  سقارش با  شناسه ${id} موفقیت آمیز نبود`),
    )
  }

  const columns: any[] = [
    'شماره سفارش',
    'وضعیت',
    'کاربر',
    'شماره پرداخت',
    'آدرس',
    'یادداشت ها',
    'تاریخ ثبت سفارش',
    'آخرین بروزرسانی',
    'فعالیت ها',
  ]

  const data = orders?.data?.data?.map((order: any) => [
    order?.id,
    translator(order?.status),
    `${order?.user?.name ?? '?'} ${order?.user?.lastname ?? ''}`,
    order?.payment_id,
    order?.address?.address,
    <OrderNotes notes={order.notes} />,
    toLocalDate(order.created_at) + ' - ' + toLocalTime(order.created_at),
    toLocalDate(order.updated_at) + ' - ' + toLocalTime(order.updated_at),
    <Container>
      {has(permissions, PermissionEnum.readOrder) && (
        <Link href={`/orders/${order?.id}`}>
          <a>
            <Button style={{ marginLeft: '1rem' }} status="Info">
              مشاهده
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.editUser) && (
        <Link href={`/orders/edit/${order?.id}`}>
          <a>
            <Button style={{ marginLeft: '1rem' }} status="Primary">
              ویرایش
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.deleteUser) && (
        <Button status="Danger" onClick={() => setItemToRemove(order)}>
          حذف
        </Button>
      )}
    </Container>,
  ])

  return (
    <Layout title="سفارشات">
      <h1>
        سفارشات
        <Link href="/orders/create">
          <a target="_blank">
            <Button style={{ marginRight: '1rem' }}>ثبت سفارش جدید</Button>
          </a>
        </Link>
        {tableSelections?.length > 0 && has(permissions, PermissionEnum.deleteUser) && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </h1>

      {has(permissions, PermissionEnum.browseUser) && (
        <>
          <SearchBar
            fields={orders.fields}
            entity="orders"
            params={router.query}
            callback={(form: any) =>
              router.push({
                pathname: '/orders/search',
                query: form,
              })
            }
          />

          <BasicTable getSelections={setTableSelections} isOrder columns={columns} rows={data} />

          <PaginationBar
            totalPages={orders?.data?.last_page}
            activePage={router.query.page ? Number(router.query.page) : 1}
            router={router}
          />
        </>
      )}

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف بنر مورد <span className="text-danger">{itemToRemove?.id}</span> با عنوان{' '}
          <span className="text-danger">{itemToRemove?.user?.name ?? '?'}</span> اطمینان دارید؟
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
