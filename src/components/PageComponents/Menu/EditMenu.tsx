import { InputGroup as _InputGroup, Modal } from '@paljs/ui'
import { AdsMenuForm, Button, FlexContainer, HeaderButton, ModalBox, TopSiteMenuForm } from 'components'
import Cookies from 'js-cookie'
import Layout from 'Layouts'
import { has } from 'lodash'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { MenuType, PermissionEnum, TopSiteMenu } from 'types'
import { deleteMenu, editMenu, removeItem, useStore, useUserStore } from 'utils'
import { BottomSiteDescriptionForm, ProductsBottomSiteMenuForm } from './components'
import { BottomSiteMenuForm } from './components/ProductsBottomSiteMenuForm'

export const EditMenuPage: React.FC = () => {
  const { menu } = useStore((state: any) => ({
    menu: state?.menu,
  }))
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('menu', removeId, deleteMenu, () => router.push('/menu'), [
      `منو ${removeId} با موفقیت حذف شد`,
      'حذف منو موفقیت آمیز نبود',
    ])
  }

  const updateMenuCallback = async (type: MenuType, items: any) => {
    setLoading(true)
    const response = await editMenu(menu?.id, { type, items }, Cookies.get(process.env.TOKEN!))
    if (response?.status === 'success') {
      toast.success('منو با موفقیت بروز شد')
      router.back()
    } else {
      toast.error('بروزرسانی منو موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  const renderForm = (type: MenuType, defaultValues: any) => {
    switch (type) {
      case 'top-site':
        return (
          <TopSiteMenuForm
            loading={loading}
            callback={(menu: TopSiteMenu) => updateMenuCallback('top-site', JSON.parse(JSON.stringify(menu)))}
            defaultValues={defaultValues}
          />
        )

      case 'ad':
        return (
          <AdsMenuForm
            loading={loading}
            callback={(items: any) => updateMenuCallback('ad', items)}
            defaultValues={defaultValues}
          />
        )

      case 'bottom-site':
        return (
          <BottomSiteMenuForm
            loading={loading}
            callback={(items: any) => updateMenuCallback('bottom-site', items)}
            defaultValues={defaultValues}
          />
        )

      case 'bottom-site-descrpitions':
        return (
          <BottomSiteDescriptionForm
            loading={loading}
            callback={(items: any) => updateMenuCallback('bottom-site-descriptions', items)}
            defaultValues={defaultValues}
          />
        )

      case 'products-bottom-site-menu':
        return (
          <ProductsBottomSiteMenuForm
            loading={loading}
            callback={(items: any) => updateMenuCallback('products-bottom-site-menu', items)}
            defaultValues={defaultValues}
          />
        )
    }
  }

  return (
    <Layout title={`ویرایش منوی ${menu?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>ویرایش منو شماره {menu?.id}</h1>

      {renderForm(menu?.type, menu?.items)}

      {/* ....:::::: Remove Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          <div style={{ marginBottom: '1rem' }}>
            آیا از حذف برچسب
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
