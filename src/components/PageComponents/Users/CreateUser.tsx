import { Button, InputGroup, Select } from '@paljs/ui'
import Layout from 'Layouts'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { createUser } from 'utils'
import router from 'next/router'

const roleOptions = [
  { label: 'ادمین', value: 'admin' },
  { label: 'بدون نقش', value: null },
]

export function CreateUser() {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, control, reset } = useForm()

  const onSubmit = async (form: any) => {
    setLoading(true)
    const response = await createUser(form, Cookies.get(process.env.TOKEN!))
    if (response?.status === 'success') {
      reset()
      router.push('/users')
      toast.success('کاربر با موفقیت ساخته شد')
    } else {
      toast.error('ساخت کاربر موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  return (
    <Layout title="ساخت کاربر صفحه اصلی">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>ساخت کاربر</h1>

        <InputGroup className="col">
          <label>نام کاربر</label>
          <input {...register('name', { required: true })} placeholder="نام" />
        </InputGroup>

        <InputGroup className="col">
          <label>نام خانوادگی</label>
          <input {...register('lastname', { required: true })} placeholder="نام خانوادگی" />
        </InputGroup>

        <InputGroup className="col">
          <label>ایمیل</label>
          <input type="email" {...register('email', { required: true })} placeholder="ایمیل" />
        </InputGroup>

        <InputGroup className="col">
          <label>رمز عبور</label>
          <input type="password" {...register('password', { required: true })} placeholder="رمز عبور" />
        </InputGroup>

        <InputGroup fullWidth style={{ display: 'flex', flexDirection: 'column' }}>
          <label>نقش</label>
          <Controller
            control={control}
            name="role"
            render={({ field }) => <Select options={roleOptions} onChange={(e: any) => field?.onChange(e?.value)} />}
          />
        </InputGroup>

        <Button disabled={loading} style={{ width: '10rem', marginTop: '3rem' }} status="Success" appearance="outline">
          {loading ? '...' : 'ساخت کاربر'}
        </Button>
      </Form>
    </Layout>
  )
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`
