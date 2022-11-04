import React, { useState } from 'react'
import styled from 'styled-components'
import { useStore, deleteStock, numeralize, useUserStore, has } from 'utils'
import Layout from 'Layouts'
import { Button, Container, Modal } from '@paljs/ui'
import { BasicTable, FlexContainer, HeaderButton, PaginationBar, SearchBar } from 'components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Add } from '@material-ui/icons'
import { toast } from 'react-toastify'
import { PermissionEnum } from 'types'

export const StockPage = () => {
  const router = useRouter()

  const { stocks, clearList } = useStore((state) => ({
    stocks: state?.stocks,
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
    const response = await deleteStock(item?.id)
    if (response?.status === 'success') {
      clearList('stocks', item?.id)
      setItemToRemove(null)
      toast.success('انبار با موفقیت حذف شد')
    } else {
      toast.error('حذف انبار موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  const pluralRemoveTrigger = async (selections: any[]) => {
    setLoading(true)

    if (selections?.length > 0) {
      const deletions = await selections?.map(async (id) => {
        const response = await deleteStock(id)
        console.log(response)

        if (response?.status === 'success') {
          clearList('stocks', id)

          toast.success(`مورد با شناسه ${id} حذف شد`)
        }
      })

      await setTableSelections([])
      await setItemsToRemove(null)
    }

    setLoading(false)
  }

  const columns: any[] = ['شناسه انبار', 'شناسه محصول انبار', 'سایز', 'تعداد', 'قیمت', 'قیمت با تخفیف', 'فعالیت']

  const data = stocks?.data?.data?.map((stock: any) => [
    // =====>> Table Columns <<=====
    stock?.id,
    stock?.product_id,
    stock?.size,
    stock?.count,
    `${numeralize(stock?.price)} تومان`,
    `${numeralize(stock?.priceAfterDiscount)} تومان`,
    <Container>
      <Link href={`/stock/${stock?.id}`}>
        <Button style={{ marginLeft: '1rem' }} status="Info">
          مشاهده
        </Button>
      </Link>
      <Link href={`/stock/edit/${stock?.id}`}>
        <Button style={{ marginLeft: '1rem' }} status="Primary">
          ویرایش
        </Button>
      </Link>
      <Button status="Danger" onClick={() => setItemToRemove(stock)}>
        حذف
      </Button>
    </Container>,
  ])

  return (
    <Layout title="انبار">
      <h1>انبار</h1>

      <FlexContainer>
        {has(permissions, PermissionEnum.editStock) && (
          <Link href="/stock/create">
            <Button
              style={{
                margin: '1rem 0 1rem 1rem',
                display: 'flex',
              }}
              status="Success"
              appearance="outline"
            >
              افزودن انبار
              <Add />
            </Button>
          </Link>
        )}
        {tableSelections?.length > 0 && has(permissions, PermissionEnum.deleteStock) && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </FlexContainer>

      {has(permissions, PermissionEnum.browseStock) && (
        <>
          <SearchBar
            fields={stocks.fields}
            entity="stocks"
            params={router.query}
            callback={(form: any) =>
              router.push({
                pathname: '/stock/search',
                query: form,
              })
            }
          />

          <BasicTable getSelections={setTableSelections} columns={columns} rows={data} />

          <PaginationBar
            totalPages={stocks?.data?.last_page}
            activePage={router.query.page ? Number(router.query.page) : 1}
            router={router}
          />
        </>
      )}

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف انبار <span className="text-danger">{`${itemToRemove?.id} `}</span> برای محصول{' '}
          <span className="text-danger">{`${itemToRemove?.product_id} `}</span> اطمینان دارید؟
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
