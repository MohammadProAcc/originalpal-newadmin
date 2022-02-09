import React, { useState } from 'react'
import styled from 'styled-components'
import { useStore, deleteCoupon, pluralRemove } from 'utils'
import Layout from 'Layouts'
import { Button, Container, Modal } from '@paljs/ui'
import { BasicTable, FlexContainer, HeaderButton, PaginationBar, SearchBar } from 'components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Add } from '@material-ui/icons'
import { toast } from 'react-toastify'

export const CouponsPage = () => {
  const router = useRouter()

  const { coupons, clearList } = useStore((state) => ({
    coupons: state?.coupons,
    clearList: state?.clearList,
  }))

  const [loading, setLoading] = useState(false)

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const [itemsToRemove, setItemsToRemove] = useState<any>(null)

  const [tableSelections, setTableSelections] = useState<number[] | []>([])

  const toggleModal = () => setItemToRemove(null)

  const togglePluralRemoveModal = () => setItemsToRemove(null)

  const removeItem = async (item: any) => {
    setLoading(true)
    const response = await deleteCoupon(item?.id)
    if (response?.status === 'success') {
      clearList('coupons', item?.id)
      setItemToRemove(null)
      toast.success('کوپن با موفقیت حذف شد')
    } else {
      toast.error('حذف کوپن موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  const pluralRemoveTrigger = async (selections: any[]) => {
    await pluralRemove(
      'coupons',
      selections,
      deleteCoupon,
      (entity: string, id: any) => {
        clearList(entity, id)
        toast.success(`مورد با شناسه ${id} حذف شد`)
      },
      () => {
        setTableSelections([])
        setItemsToRemove(null)
      },
      (id: number) => toast.error(`حذف  کوپن با  شناسه ${id} موفقیت آمیز نبود`),
    )
  }

  const columns: any[] = ['شناسه کوپن', 'کد', 'نوع', 'مقدار', 'توضیحات', 'فعالیت ها']

  const data = coupons?.data?.data?.map((coupon: any) => [
    // =====>> Table Columns <<=====
    coupon?.id ?? '-',
    coupon?.code ?? '-',
    coupon?.type ?? '-',
    coupon?.amount ?? '-',
    coupon?.decription ?? '-',

    <Container>
      <Link href={`/coupons/${coupon?.id}`}>
        <Button style={{ marginLeft: '1rem' }} status="Info">
          مشاهده
        </Button>
      </Link>
      <Link href={`/coupons/edit/${coupon?.id}`}>
        <Button style={{ marginLeft: '1rem' }} status="Primary">
          ویرایش
        </Button>
      </Link>
      <Button status="Danger" onClick={() => setItemToRemove(coupon)}>
        حذف
      </Button>
    </Container>,
  ])

  return (
    <Layout title="بنر های صفحه اصلی">
      <h1>کوپن ها</h1>

      <FlexContainer>
        <Link href="/coupons/create">
          <Button
            style={{
              margin: '1rem 0 1rem 1rem',
              display: 'flex',
            }}
            status="Success"
            appearance="outline"
          >
            افزودن کوپن
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
        fields={coupons.fields}
        entity="coupons"
        params={router.query}
        callback={(form: any) =>
          router.push({
            pathname: '/coupons/search',
            query: form,
          })
        }
      />

      <BasicTable getSelections={setTableSelections} columns={columns} rows={data} />
      <PaginationBar
        totalPages={coupons?.data?.last_page}
        activePage={router.query.page ? Number(router.query.page) : 1}
        router={router}
      />

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف کوپن <span className="text-danger">{`${itemToRemove?.id}`}</span> با کد{' '}
          <span className="text-danger">{`${itemToRemove?.code}`}</span> اطمینان دارید؟
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
