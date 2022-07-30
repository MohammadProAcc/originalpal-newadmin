import { deleteAddress, numeralize, removeItem, translator, useStore } from 'utils'
import Layout from 'Layouts'
import { Card, CardBody, CardHeader, Modal } from '@paljs/ui'
import React, { useState } from 'react'
import router from 'next/router'
import { Button, FlexContainer, HeaderButton, ModalBox } from 'components'

const clacTotalPrice = (addressItems: any[]) => {
  // const priceArr = address['address_items']
  const priceArr = addressItems?.map((addressItem: any) => addressItem?.price)
  if (priceArr?.length > 0) {
    const price = priceArr?.reduce((prev: number, curr: number) => curr + prev)
    return price
  }
}

export const SingleAddressPage: React.FC = () => {
  const { address } = useStore((state: any) => ({
    address: state?.address,
  }))

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('address', removeId, deleteAddress, () => router.push('/address'), [
      `آدرس ${removeId} با موفقیت حذف شد`,
      'حذف آدرس موفقیت آمیز نبود',
    ])
  }

  return (
    <Layout title={`آدرس شماره ${address?.id}`}>
      <h1 style={{ margin: '0 0 4rem 0' }}>
        آدرس شماره {address?.id}
        <HeaderButton status="Info" href={`/address/edit/${address?.id}`}>
          ویرایش
        </HeaderButton>
        <HeaderButton status="Danger" onClick={() => setItemToRemove(address)}>
          حذف
        </HeaderButton>
      </h1>

      {Object.keys(address).map((key) => (
        <Card key={key}>
          <CardHeader>{translator(key)}</CardHeader>

          <CardBody>{address[key]}</CardBody>
        </Card>
      ))}

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          <div style={{ marginBottom: '1rem' }}>
            آیا از حذف آدرس
            <span className="mx-1">{itemToRemove?.id}</span>
            اطمینان دارید؟
          </div>
          <FlexContainer jc="space-between">
            <Button onClick={closeRemovalModal}>انصراف</Button>
            <Button onClick={() => remove(itemToRemove?.id)} status="Danger">
              حذف
            </Button>
          </FlexContainer>
        </ModalBox>
      </Modal>
    </Layout>
  )
}
