import { Button, Card, CardBody, CardHeader, Modal } from '@paljs/ui'
import { HeaderButton, ModalBox } from 'components'
import { FlexContainer } from 'components/Container/FlexContainer'
import Layout from 'Layouts'
import router from 'next/router'
import { useState } from 'react'
import styled, { css } from 'styled-components'
import { deleteMainPageSection, removeItem, toLocalDate, useStore } from 'utils'

export const SingleMainPageSectionPage: React.FC = () => {
  const { mainPageSection } = useStore((state: any) => ({
    mainPageSection: state?.mainPageSection,
  }))

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('mainPageSection', removeId, deleteMainPageSection, () => router.push('/mainPageSection'), [
      `بخش صقحه اصلی ${removeId} با موفقیت حذف شد`,
      'حذف بخش صقحه اصلی موفقیت آمیز نبود',
    ])
  }

  return (
    <Layout title={`${mainPageSection?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>
        مشاهده بخش صقحه اصلی {mainPageSection?.id}
        <HeaderButton status="Info" href={`/mainPageSection/edit/${mainPageSection?.id}`}>
          ویرایش
        </HeaderButton>
        <HeaderButton status="Danger" onClick={() => setItemToRemove(mainPageSection)}>
          حذف
        </HeaderButton>
      </h1>

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          <div style={{ marginBottom: '1rem' }}>آیا از حذف بخش صقحه اصلی {itemToRemove?.id} اطمینان دارید؟</div>
          <FlexContainer jc="space-between">
            <Button onClick={closeRemovalModal}>انصراف</Button>
            <Button onClick={() => remove(itemToRemove?.id)} status="Danger">
              حذف
            </Button>
          </FlexContainer>
        </ModalBox>
      </Modal>

      <Card>
        <CardHeader>تاریخ ها</CardHeader>
        <Card>
          <CardHeader>ساخته شده در :</CardHeader>
          <CardBody>{toLocalDate(mainPageSection?.created_at) ?? '-'}</CardBody>
        </Card>
        <Card>
          <CardHeader>بروز شده شده در :</CardHeader>
          <CardBody>{toLocalDate(mainPageSection?.updated_at) ?? '-'}</CardBody>
        </Card>
      </Card>
    </Layout>
  )
}
