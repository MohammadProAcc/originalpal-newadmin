import { Button, Checkbox, InputGroup, Select } from '@paljs/ui'
import Layout from 'Layouts'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { createBrand } from 'utils'
import router from 'next/router'

export function CreateBrand() {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (form: any) => {
    setLoading(true)
    const response = await createBrand(form, Cookies.get('token'))
    if (response?.status === 'success') {
      reset()

      toast.success('بنر با موفقیت ساخته شد')

      router.push('/brands')
    } else {
      toast.error('ساخت برند موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  return (
    <Layout title="ساخت بنر صفحه اصلی">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>ساخت برند</h1>

        <InputGroup className="col">
          <label>نام برند</label>
          <input {...register('name', { required: true })} placeholder="نام" />
        </InputGroup>

        <InputGroup className="col mt-4">
          <label>عنوان متا</label>
          <input {...register('meta_title', { required: true })} placeholder="عنوان متا" />

          <InputGroup className="col mt-4">
            <label>کلمات کلیدی</label>
            <input {...register('meta_keywords', { required: true })} placeholder="کلمات کلیدی متا" />
          </InputGroup>
        </InputGroup>

        <InputGroup className="col mt-4">
          <label>توضیحات متا</label>
          <input {...register('meta_description', { required: true })} placeholder="توصیحات متا" />
        </InputGroup>

        <InputGroup className="col mt-4">
          <label>عنوان صفحه</label>
          <input {...register('title_page', { required: true })} placeholder="عنوان صفحه" />
        </InputGroup>

        <InputGroup className="col mt-4">
          <label>متن برچسب</label>
          <input {...register('tagText', { required: true })} placeholder="متن برچسب" />
        </InputGroup>

        <Button disabled={loading} style={{ width: '10rem', marginTop: '3rem' }} status="Success" appearance="outline">
          {loading ? '...' : 'ساخت برند'}
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
