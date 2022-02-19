import { InputGroup as _InputGroup, Modal } from '@paljs/ui'
import { AdsMenuForm, Button, FlexContainer, HeaderButton, ModalBox, TopSiteMenuForm } from 'components'
import Cookies from 'js-cookie'
import Layout from 'Layouts'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { MenuType, TopSiteMenu } from 'types'
import { deleteMenu, editMenu, getSingleMenu, removeItem, useStore } from 'utils'
import { BottomSiteMenuForm } from './components'

export const EditMenuPage: React.FC = () => {
  const { menu, reload } = useStore((state: any) => ({
    menu: state?.menu,
    reload: state?.reload,
  }))

  const router = useRouter()

  const reloadMenu = async () => {
    const reloadedMenu = await getSingleMenu(menu?.id)
    reload('menu', reloadedMenu)
  }

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: menu,
  })

  const onSubmit = async (form: any) => {
    setLoading(true)
    console.log(form)
    setLoading(false)
  }

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
    const response = await editMenu(menu?.id, { type, items }, Cookies.get('token'))
    if (response?.status === 'success') {
      toast.success('منو با موفقیت بروز شد')
      router.back()
    } else {
      toast.error('بروزرسانی منو موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  const renderForm = (type: 'top-site' | 'ad' | 'bottom-site', defaultValues: any) => {
    switch (type) {
      case 'top-site':
        return (
          <TopSiteMenuForm
            loading={loading}
            callback={(menu: TopSiteMenu) => updateMenuCallback('top-site', menu)}
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
    }
  }

  return (
    <Layout title={`${menu?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>
        ویرایش منو شماره {menu?.id}
        <HeaderButton status="Info" href={`/menu/${menu?.id}`}>
          مشاهده
        </HeaderButton>
        <HeaderButton status="Danger" onClick={() => setItemToRemove(menu)}>
          حذف
        </HeaderButton>
      </h1>

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
