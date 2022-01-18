import { editUser, useStore } from 'utils';
import Layout from 'Layouts';
import { Card, CardBody, CardHeader, InputGroup, Select } from '@paljs/ui';
import { Button } from 'components';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import React, { useState } from 'react';

const roleOptions = [
  { label: 'ادمین', value: 'admin' },
  { label: 'بدون نقش', value: null },
];

export const EditUserPage: React.FC = () => {
  const { user } = useStore((state: any) => ({
    user: state?.user,
  }));

  const [newPassword, setNewPassword] = useState('');
  const changePassword = (password: string) => {
    console.log(password);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: user,
  });
  type UserForm = typeof dirtyFields;

  const onSubmit = async (form: UserForm) => {
    for (let key in form) {
      if (!dirtyFields[key]) {
        delete form[key];
      }
    }

    const response = await editUser(user?.id, form);
    if (response?.status === 'success') {
      toast.success('کاربر بروز شد');
    } else {
      toast.error('بروزرسانی کاربر موفقیت آمیز نبود');
    }
  };

  return (
    <Layout title={`${user?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>کاربر {user?.name}</h1>
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
            <Button type="button" appearance="outline" onClick={() => changePassword(newPassword)}>
              تغییر دادن رمز عبور
            </Button>
          </CardHeader>
          <CardBody>
            <InputGroup>
              <input placeholder="تغییر رمز عبور" onChange={(e: any) => setNewPassword(e?.target?.value)} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>نقش</CardHeader>
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
  );
};
