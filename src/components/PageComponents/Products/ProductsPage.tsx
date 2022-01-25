import React, { useState } from 'react'
import styled from 'styled-components'
import { useStore, deleteProduct, numeralize } from 'utils'
import Layout from 'Layouts'
import { Button, Container, Modal } from '@paljs/ui'
import { BasicTable, PaginationBar, SearchBar } from 'components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Add } from '@material-ui/icons'
import { toast } from 'react-toastify'
import { Avatar } from '@material-ui/core'
import axios from 'axios'
import Cookies from 'js-cookie'

export const ProductsPage = () => {
  const router = useRouter()

  const { products, clearList } = useStore((state) => ({
    products: state?.products,
    clearList: state?.clearList,
  }))

  const [loading, setLoading] = useState(false)

  const [itemToRemove, setItemToRemove] = useState<any>(null)

  const [tableSelections, setTableSelections] = useState<number[] | []>([])

  const toggleModal = () => setItemToRemove(null)

  const removeItem = async (item: any) => {
    setLoading(true)
    // const response = await deleteProduct(item?.id)
    const { data: response } = await axios.delete(`${process.env.API}/admin/products/${item?.id})`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token') ?? ''}`,
      },
    })
    if (response?.status === 'success') {
      clearList('products', item?.id)
      setItemToRemove(null)
      toast.success('محصول با موفقیت حذف شد')
    } else {
      toast.error('حذف محصول موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  const columns: any[] = ['شناسه', 'تصویر محصول', 'قیمت', 'قیمت با تخفیف', 'نام', 'کد', 'برند', 'وضعیت', 'فعالیت ها']

  const data = products?.data?.data?.map((product: any) => [
    // =====>> Table Columns <<=====
    product?.id,
    <Avatar
      variant="rounded"
      style={{ width: '5rem', height: '3rem' }}
      src={`${process.env.SRC}/${product?.site_main_picture?.u}`}
    />,
    <span>
      <strong>{numeralize(product?.price)}</strong> تومان
    </span>,
    <span>
      <strong>{numeralize(product?.discount_price)}</strong> تومان
    </span>,
    product?.name,
    product?.code,
    product?.brand ?? '-',
    product?.Enable,
    <Container>
      <Link href={`/products/${product?.id}`}>
        <Button style={{ marginLeft: '1rem' }} status="Info">
          مشاهده
        </Button>
      </Link>
      <Link href={`/products/edit/${product?.id}`}>
        <Button style={{ marginLeft: '1rem' }} status="Primary">
          ویرایش
        </Button>
      </Link>
      <Button status="Danger" onClick={() => setItemToRemove(product)}>
        حذف
      </Button>
    </Container>,
  ])

  return (
    <Layout title="بنر های صفحه اصلی">
      <h1>محصول ها</h1>

      <Link href="/products/create">
        <Button
          style={{
            margin: '1rem 0 1rem 1rem',
            display: 'flex',
          }}
          status="Success"
          appearance="outline"
        >
          افزودن محصول
          <Add />
        </Button>
      </Link>

      <SearchBar
        fields={products.fields}
        entity="products"
        params={router.query}
        callback={(form: any) =>
          router.push({
            pathname: '/products/search',
            query: form,
          })
        }
      />

      <BasicTable getSelections={setTableSelections} columns={columns} rows={data} />
      <PaginationBar
        totalPages={products?.data?.last_page}
        activePage={router.query.page ? Number(router.query.page) : 1}
        router={router}
      />

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف محصول <span className="text-danger">{`${itemToRemove?.id}`}</span> با عنوان{' '}
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
