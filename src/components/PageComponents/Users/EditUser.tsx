import { deleteUser, editUser, getSingleUser, removeItem, translator, useStore } from 'utils'
import Layout from 'Layouts'
import { Card, CardBody, CardHeader, InputGroup, Modal, Select } from '@paljs/ui'
import { Button, FlexContainer, HeaderButton, ModalBox } from 'components'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import router from 'next/router'

const roleOptions = [
  { label: 'ادمین', value: 'admin' },
  { label: 'بدون نقش', value: null },
]

export const EditUserPage: React.FC = () => {
  const { user, updateUser } = useStore((state: any) => ({
    user: state?.user,
    updateUser: state?.updateUser,
  }))

  const [newPassword, setNewPassword] = useState('')
  const changePassword = (password: string) => {
    console.log(password)
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: user,
  })
  type UserForm = typeof dirtyFields

  const onSubmit = async (form: UserForm) => {
    for (let key in form) {
      if (!dirtyFields[key]) {
        delete form[key]
      }
    }

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
        <HeaderButton status="Info" href={`/users/${user?.id}`}>
          مشاهده
        </HeaderButton>
        <HeaderButton status="Danger" onClick={() => setItemToRemove(user)}>
          حذف
        </HeaderButton>
      </h1>

      {/* ....:::::: Modals :::::.... */}
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
          <CardHeader>
            رمز عبور{' '}
            <Button
              disabled
              style={{ display: 'inline-flex', marginRight: '1rem' }}
              type="button"
              appearance="outline"
              onClick={() => changePassword(newPassword)}
            >
              تغییر دادن رمز عبور
            </Button>
          </CardHeader>
          <CardBody>
            <InputGroup>
              <input disabled placeholder="تغییر رمز عبور" onChange={(e: any) => setNewPassword(e?.target?.value)} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>نقش : {translator(user?.role)}</CardHeader>
          <CardBody style={{ overflow: 'initial' }}>
            <Controller
              control={control}
              name="role"
              render={({ field }) => <Select options={roleOptions} onChange={(e: any) => field?.onChange(e?.value)} />}
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
