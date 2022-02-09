import React, { useState } from 'react'
import styled from 'styled-components'
import { deleteOrder, pluralRemove, translator, useStore } from 'utils'
import Layout from 'Layouts'
import { Button, Container, Modal } from '@paljs/ui'
import { BasicTable, HeaderButton, PaginationBar, SearchBar } from 'components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Add } from '@material-ui/icons'
import { toast } from 'react-toastify'

export const OrdersPage = () => {
  const router = useRouter()

  const { orders, clearList } = useStore((state) => ({
    orders: state?.orders,
    clearList: state?.clearList,
  }))

  const [loading, setLoading] = useState(false)

  const [itemToRemove, setItemToRemove] = useState<any>(null)

  const [itemsToRemove, setItemsToRemove] = useState<any>(null)
  const togglePluralRemoveModal = () => setItemsToRemove(null)

  const [tableSelections, setTableSelections] = useState<number[] | []>([])

  const toggleModal = () => setItemToRemove(null)

  const removeItem = async (item: any) => {
    setLoading(true)
    console.log(item)
    const response = await deleteOrder(item?.id)
    if (response?.status === 'success') {
      clearList('orders', item?.id)
      toggleModal()
      toast.success('سفارش با موفقیت حذف شد')
    } else {
      toast.error('عملیات حذف موفقیت آمیز نبود')
    }
    console.log(response)
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
        await setTableSelections([])
        setItemsToRemove(null)
      },
      (id: number) => toast.error(`حذف  سقارش با  شناسه ${id} موفقیت آمیز نبود`),
    )
  }

  const columns: any[] = ['شماره سفارش', 'وضعیت', 'کاربر', 'شماره پرداخت', 'آدرس', 'فعالیت ها']

  const data = orders?.data?.data?.map((order: any) => [
    order?.id,
    translator(order?.status),
    `${order?.user?.name ?? '?'} ${order?.user?.lastnam ?? ''}`,
    'در پاسخ درخواست از سرور برنمیگردد',
    order?.address?.address,
    <Container>
      <Link href={`/orders/${order?.id}`}>
        <Button style={{ marginLeft: '1rem' }} status="Info">
          مشاهده
        </Button>
      </Link>
      <Link href={`/orders/edit/${order?.id}`}>
        <Button style={{ marginLeft: '1rem' }} status="Primary">
          ویرایش
        </Button>
      </Link>
      <Button status="Danger" onClick={() => setItemToRemove(order)}>
        حذف
      </Button>
    </Container>,
  ])

  return (
    <Layout title="سفارشات">
      <h1>
        سفارشات
        {tableSelections?.length > 0 && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </h1>

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
