import { deleteMenu, editMenu, getSingleMenu, removeItem, useStore } from 'utils'
import Layout from 'Layouts'
import { Card, CardBody, CardHeader, Checkbox, InputGroup, Modal, Popover } from '@paljs/ui'
import { BasicEditor, Button, FlexContainer, HeaderButton, ModalBox } from 'components'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import React, { useState, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { MediaCard } from 'components/Card'
import router from 'next/router'

export const EditMenuPage: React.FC = () => {
  const { menu, reload } = useStore((state: any) => ({
    menu: state?.menu,
    reload: state?.reload,
  }))

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>
          <span style={{ margin: '0 0 0 1rem' }}>ویرایش منو</span>
        </h2>

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

        <InputGroup>
          <label>نوع</label>
          <input {...register('type')} placeholder="نوع" />
        </InputGroup>

        <InputGroup>
          <label>موارد</label>
          <Popover
            trigger="focus"
            placement="top"
            overlay={
              <p>
                منوی ساخته شده توسط{' '}
                <a href="https://www.jqueryscript.net/demo/Drag-Drop-Menu-Builder-For-Bootstrap/">ابزار منو ساز</a> را
                در انی مورودی کپی منید
              </p>
            }
          >
            <input {...register('items')} placeholder="موارد" />
          </Popover>
        </InputGroup>

        <Button disabled={loading} style={{ width: '10rem', marginTop: '3rem' }} status="Info" appearance="outline">
          {loading ? '...' : 'بروزرسانی منو'}
        </Button>
      </form>
    </Layout>
  )
}
