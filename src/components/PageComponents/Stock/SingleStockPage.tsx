import { Button, Card, CardBody, CardHeader, Modal } from '@paljs/ui'
import { HeaderButton, ModalBox } from 'components'
import { DatesCard } from 'components/Card/DatesCard'
import { FlexContainer } from 'components/Container/FlexContainer'
import Layout from 'Layouts'
import router from 'next/router'
import { useState } from 'react'
import { PermissionEnum } from 'types'
import { deleteStock, has, removeItem, toLocalDate, useStore, useUserStore } from 'utils'

export const SingleStockPage: React.FC = () => {
  const { stock } = useStore((state: any) => ({
    stock: state?.stock,
  }))
  const permissions = useUserStore().getPermissions()

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('stock', removeId, deleteStock, () => router.push('/stock'), [
      `انبار ${removeId} با موفقیت حذف شد`,
      'حذف انبار موفقیت آمیز نبود',
    ])
  }

  return (
    <Layout title={`${stock?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>
        مشاهده انبار {stock?.id}
        {has(permissions, PermissionEnum.editStock) && (
          <HeaderButton status="Info" href={`/stock/edit/${stock?.id}`}>
            ویرایش
          </HeaderButton>
        )}
        {has(permissions, PermissionEnum.deleteStock) && (
          <HeaderButton status="Danger" onClick={() => setItemToRemove(stock)}>
            حذف
          </HeaderButton>
        )}
      </h1>

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          <div style={{ marginBottom: '1rem' }}>آیا از حذف انبار {itemToRemove?.id} اطمینان دارید؟</div>
          <FlexContainer jc="space-between">
            <Button onClick={closeRemovalModal}>انصراف</Button>
            <Button onClick={() => remove(itemToRemove?.id)} status="Danger">
              حذف
            </Button>
          </FlexContainer>
        </ModalBox>
      </Modal>

      <Card>
        <CardHeader>شناسه انبار</CardHeader>
        <CardBody>{stock?.id}</CardBody>
      </Card>

      <Card>
        <CardHeader>نام انبار</CardHeader>
        <CardBody>{stock?.code}</CardBody>
      </Card>

      <Card>
        <CardHeader>شناسه محصول انبار</CardHeader>
        <CardBody>{stock?.product_id ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>نام محصول</CardHeader>
        <CardBody>{stock?.product?.name ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>توضیحات سایز</CardHeader>
        <CardBody>{stock?.disc ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>تعداد</CardHeader>
        <CardBody>{stock?.count ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>قیمت</CardHeader>
        <CardBody>{stock?.price ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>قیمت با تخفیف</CardHeader>
        <CardBody>{stock?.priceAfterDiscount ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>نوع تخفیف</CardHeader>
        <CardBody>{stock?.discount_type ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>مقدار تخفیف</CardHeader>
        <CardBody>{stock?.discount_amout ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>شروع تخفیف</CardHeader>
        <CardBody>{stock?.discount_start ?? '-'}</CardBody>
      </Card>

      <Card>
        <CardHeader>پایان تخفیف</CardHeader>
        <CardBody>{stock?.discount_end ?? '-'}</CardBody>
      </Card>

      <DatesCard createdAt={stock?.created_at} updatedAt={stock?.updated_at} />
    </Layout>
  )
}
