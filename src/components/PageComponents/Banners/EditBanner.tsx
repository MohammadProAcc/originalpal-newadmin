import { LoadingOverlay } from '@mantine/core'
import { Button, Modal } from '@paljs/ui'
import { useQuery } from '@tanstack/react-query'
import { FlexContainer, HeaderButton, ModalBox } from 'components'
import { BannerForm } from 'components/Form/derived/BannerForm'
import Layout from 'Layouts'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { PermissionEnum } from 'types'
import { has, removeItem, useUserStore } from 'utils'
import { deleteBanner } from 'utils/api/REST/actions/banners'
import { getSingleBanner } from 'utils/api/REST/actions/banners/getSingleBanner'

export function EditBanner() {
  const router = useRouter()
  const bannerId = router.query.banner_id as string

  const { data: banner, isLoading, refetch } = useQuery(['banner', bannerId], () => getSingleBanner(bannerId))

  async function afterUpdateCallback() {
    router.back()
  }

  const permissions = useUserStore().getPermissions()

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('banners', removeId, deleteBanner, () => router.push('/banners'), [
      `بنر ${removeId} با موفقیت حذف شد`,
      'حذف بنر موفقیت آمیز نبود',
    ])
  }

  return (
    <Layout title="ویرایش بنر">
      <LoadingOverlay visible={isLoading} />
      <h1>
        بروزرسانی بنر (شناسه: {banner?.id})
        <FlexContainer style={{ display: 'inline-flex' }}>
          {has(permissions, PermissionEnum.readStand) && (
            <HeaderButton status="Info" href={`/banners/${banner?.id}`}>
              مشاهده
            </HeaderButton>
          )}

          {has(permissions, PermissionEnum.deleteStand) && (
            <HeaderButton status="Danger" onClick={() => setItemToRemove(banner)}>
              حذف
            </HeaderButton>
          )}
        </FlexContainer>
      </h1>

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          آیا از حذف بنر {itemToRemove?.id} اطمینان دارید؟
          <FlexContainer jc="space-between" className="mt-3">
            <Button onClick={closeRemovalModal}>انصراف</Button>
            <Button onClick={() => remove(itemToRemove?.id)} status="Danger">
              حذف
            </Button>
          </FlexContainer>
        </ModalBox>
      </Modal>

      {banner && <BannerForm type="stand" defaultValues={banner} callback={afterUpdateCallback} />}
    </Layout>
  )
}
