import { deleteUser, editUser, getSingleUser, has, removeItem, translator, useStore, useUserStore } from 'utils'
import Layout from 'Layouts'
import { Card, CardBody, CardHeader, InputGroup, Modal, Select } from '@paljs/ui'
import { Button, FlexContainer, HeaderButton, ModalBox } from 'components'
import { Controller, useForm } from 'react-hook-form'
import React, { useState } from 'react'
import router from 'next/router'
import { toast } from 'react-toastify'
import { PermissionEnum } from 'types'

export const EditUserPage: React.FC = () => {
  const { user, updateUser, storeRoles } = useStore((state: any) => ({
    user: state?.user,
    storeRoles: state?.roles,
    updateUser: state?.updateUser,
  }))
  const permissions = useUserStore().getPermissions()

  const {
    register,
    handleSubmit,
    control,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: {
      email: user?.email,
      name: user?.name,
      lastname: user?.lastname,
      password: user?.password,
      phone: user?.phone,
      points: user?.points,
      role: user?.role,
      status: user?.status,
      roles: user?.roles?.map((_item: any) => ({
        label: _item.name,
        value: _item.id,
      })),
    },
  })
  type UserForm = typeof dirtyFields

  const roleOptions = [
    ...storeRoles.map((_role: any) => ({
      label: _role.name,
      value: _role.id,
    })),
  ]

  const onSubmit = async (form: UserForm) => {
    delete form.phone
    delete form.email

    console.log(form)
    form.roles = form.roles?.map((_role: any) => _role.value)
    const response = await editUser(user?.id, form)
    if (response?.status === 'success') {
      const updatedUser = await getSingleUser(user?.id)
      updateUser(updatedUser)
      toast.success('کاربر بروز شد')
    } else {
      toast.error('بروزرسانی کاربر موفقیت آمیز نبود')
    }
  }

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('users', removeId, deleteUser, () => router.push('/users'), [
      `کاربر ${removeId} با موفقیت حذف شد`,
      'حذف کاربر موفقیت آمیز نبود',
    ])
  }

  return (
    <Layout title={`${user?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>
        کاربر "{user?.name}"
        {has(permissions, PermissionEnum.readUser) && (
          <HeaderButton status="Info" href={`/users/${user?.id}`}>
            مشاهده
          </HeaderButton>
        )}
        {has(permissions, PermissionEnum.deleteUser) && (
          <HeaderButton status="Danger" onClick={() => setItemToRemove(user)}>
            حذف
          </HeaderButton>
        )}
      </h1>

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

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>نام کاربر</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('name', { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>نام خانوادگی</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('lastname')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>ایمیل</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('email', { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>رمز عبور </CardHeader>
          <CardBody>
            <InputGroup>
              <input placeholder="تغییر رمز عبور" {...register('password')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>نقش : {translator(user?.role)}</CardHeader>
          <CardBody style={{ overflow: 'initial' }}>
            <Controller
              control={control}
              name="roles"
              render={({ field }) => <Select options={roleOptions} isMulti {...field} />}
            />
          </CardBody>
        </Card>
        <Button status="Info" type="submit" appearance="outline">
          بروزرسانی کاربر
        </Button>
      </form>
    </Layout>
  )
}
