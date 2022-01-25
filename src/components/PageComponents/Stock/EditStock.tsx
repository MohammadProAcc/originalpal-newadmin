import { deleteStock, removeItem, useStore } from 'utils'
import Layout from 'Layouts'
import React, { useState } from 'react'
import { HeaderButton, ModalBox, StockItem } from 'components'
import { FlexContainer } from 'components/Container/FlexContainer'
import { Button, Modal } from '@paljs/ui'
import router from 'next/router'
import { css } from 'styled-components'

export const EditStockPage: React.FC = () => {
  const { stock } = useStore((state: any) => ({
    stock: state?.stock,
  }))

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('stock', removeId, deleteStock, () => router.push('/stock'), [
      `انبار ${removeId} با موفقیت حذف شد`,
      'حذف انبار موفقیت آمیز نبود',
    ])
  }

  return (
    <Layout title={`ویرایش انبار ${stock?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>
        ویرایش انبار {stock?.id}
        <FlexContainer style={{ display: 'inline-flex' }}>
          <HeaderButton status="Info" href={`/stock/${stock?.id}`}>
            مشاهده
          </HeaderButton>

          <HeaderButton status="Danger" onClick={() => setItemToRemove(stock)}>
            حذف
          </HeaderButton>
        </FlexContainer>
      </h1>

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          آیا از حذف انبار {itemToRemove?.id} اطمینان دارید؟
          <FlexContainer
            jc="space-between"
            css={css`
              margin-top: 1rem;
            `}
          >
            <Button onClick={closeRemovalModal}>انصراف</Button>
            <Button onClick={() => remove(itemToRemove?.id)} status="Danger">
              حذف
            </Button>
          </FlexContainer>
        </ModalBox>
      </Modal>

      <StockItem stock={stock} />
    </Layout>
  )
}
