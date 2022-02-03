import { deleteMainPageSection, removeItem, useStore } from 'utils'
import Layout from 'Layouts'
import React, { useState } from 'react'
import { HeaderButton, ModalBox } from 'components'
import { FlexContainer } from 'components/Container/FlexContainer'
import { Button, Modal } from '@paljs/ui'
import router from 'next/router'

export const EditMainPageSectionPage: React.FC = () => {
  const { mainPageSection } = useStore((state: any) => ({
    mainPageSection: state?.mainPageSection,
  }))

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('mainPageSection', removeId, deleteMainPageSection, () => router.push('/mainPageSection'), [
      `بخش صقحه اصلی ${removeId} با موفقیت حذف شد`,
      'حذف mainPageر موفقیت آمیز نبود',
    ])
  }

  return (
    <Layout title={`ویرایش mainPageر ${mainPageSection?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>
        ویرایش mainPageر {mainPageSection?.id}
        <FlexContainer style={{ display: 'inline-flex' }}>
          <HeaderButton status="Info" href={`/mainPageSection/${mainPageSection?.id}`}>
            مشاهده
          </HeaderButton>

          <HeaderButton status="Danger" onClick={() => setItemToRemove(mainPageSection)}>
            حذف
          </HeaderButton>
        </FlexContainer>
      </h1>

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          آیا از حذف mainPageر {itemToRemove?.id} اطمینان دارید؟
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
