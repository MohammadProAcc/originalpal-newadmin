import { Button, Card, CardBody, CardHeader, Modal } from '@paljs/ui'
import { HeaderButton, ModalBox } from 'components'
import { DatesCard } from 'components/Card/DatesCard'
import { FlexContainer } from 'components/Container/FlexContainer'
import Layout from 'Layouts'
import router from 'next/router'
import { useState } from 'react'
import { PermissionEnum } from 'types'
import { deleteMainPageSection, has, removeItem, toLocalDate, useStore, useUserStore } from 'utils'

export const SingleMainPageSectionPage: React.FC = () => {
  const { mainPageSection } = useStore((state: any) => ({
    mainPageSection: state?.mainPageSection,
  }))
  const permissions = useUserStore().getPermissions()

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('mainPageSection', removeId, deleteMainPageSection, () => router.push('/mainPageSection'), [
      `بخش صقحه اصلی ${removeId} با موفقیت حذف شد`,
      'حذف بخش صقحه اصلی موفقیت آمیز نبود',
    ])
  }

  return (
    <Layout title={`بخش صفحه اصلی ${mainPageSection?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>
        مشاهده بخش صفحه اصلی {mainPageSection?.id}
        {has(permissions, PermissionEnum.editMainPageSection) && (
          <HeaderButton status="Info" href={`/mainPageSection/edit/${mainPageSection?.id}`}>
            ویرایش
          </HeaderButton>
        )}
        {has(permissions, PermissionEnum.deleteMainPageSection) && (
          <HeaderButton status="Danger" onClick={() => setItemToRemove(mainPageSection)}>
            حذف
          </HeaderButton>
        )}
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

      <DatesCard createdAt={mainPageSection?.created_at} updatedAt={mainPageSection?.updated_at} />
    </Layout>
  )
}
