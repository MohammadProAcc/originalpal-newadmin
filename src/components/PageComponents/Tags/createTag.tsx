import { Button, Checkbox, InputGroup, Select } from '@paljs/ui'
import Layout from 'Layouts'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { createTag } from 'utils'
import router from 'next/router'

export function CreateTag() {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (form: any) => {
    setLoading(true)
    const response = await createTag(form, Cookies.get('token'))
    if (response?.status === 'success') {
      toast.success('برچسب با موفقیت ساخته شد')
      reset()
      router.push('/tags')
    } else {
      toast.error('ساخت برچسب موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  return (
    <Layout title="ساخت برچسب صفحه اصلی">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>ساخت برچسب</h1>

        <InputGroup className="col">
          <label>نام برچسب</label>
          <input {...register('name', { required: true })} placeholder="نام" />
        </InputGroup>

        <InputGroup className="col mt-4">
          <label>نوع برچسب</label>
          <input {...register('type', { required: true })} placeholder="نوع" />
        </InputGroup>

        <InputGroup className="col mt-4">
          <label>عنوان</label>
          <input {...register('title', { required: true })} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col mt-4">
          <label>توضیحات</label>
          <input {...register('description', { required: true })} placeholder="توضیحات" />
        </InputGroup>

        <InputGroup className="col mt-4">
          <label>عنوان متا</label>
          <input {...register('meta_title', { required: true })} placeholder="عنوان متا" />
        </InputGroup>

        <InputGroup className="col mt-4">
          <label>توضیحات متا</label>
          <input {...register('meta_description', { required: true })} placeholder="توصیحات متا" />
        </InputGroup>

        <InputGroup className="col mt-4">
          <label>اولویت</label>
          <input
            {...register('priority', { required: true, valueAsNumber: true })}
            placeholder="اولویت"
            type="number"
          />
        </InputGroup>

        {/* <InputGroup className="col mt-4">
          <label>عنوان صفحه</label>
          <input {...register('title_page', { required: true })} placeholder="عنوان صفحه" />
        </InputGroup> */}

        <Button disabled={loading} style={{ width: '10rem', marginTop: '3rem' }} status="Success" appearance="outline">
          {loading ? '...' : 'ساخت برچسب'}
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
