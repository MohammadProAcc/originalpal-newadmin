import { Button, InputGroup } from '@paljs/ui'
import Cookies from 'js-cookie'
import Layout from 'Layouts'
import router from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { createBrand } from 'utils'

export function CreateBrand() {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (form: any) => {
    setLoading(true)
    const response = await createBrand(form, Cookies.get(process.env.TOKEN!))
    if (response?.status === 'success') {
      reset()

      toast.success('برند با موفقیت ساخته شد')

      router.push('/brands')
    } else {
      toast.error('ساخت برند موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  return (
    <Layout title="ساخت برند صفحه اصلی">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>ساخت برند</h1>

        <InputGroup className="col" fullWidth>
          <label>نام برند</label>
          <input {...register('name', { required: true })} placeholder="نام" />
        </InputGroup>

        <InputGroup className="col mt-4" fullWidth>
          <label>عنوان متا</label>
          <input {...register('meta_title', { required: true })} placeholder="عنوان متا" />

          <InputGroup className="col mt-4" fullWidth>
            <label>کلمات کلیدی</label>
            <input {...register('meta_keywords', { required: true })} placeholder="کلمات کلیدی متا" />
          </InputGroup>
        </InputGroup>

        <InputGroup className="col mt-4" fullWidth>
          <label>توضیحات متا</label>
          <input {...register('meta_description', { required: true })} placeholder="توصیحات متا" />
        </InputGroup>

        <InputGroup className="col mt-4" fullWidth>
          <label>عنوان صفحه</label>
          <input {...register('title_page', { required: true })} placeholder="عنوان صفحه" />
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
