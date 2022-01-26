import { Button, Checkbox, InputGroup, Select } from '@paljs/ui'
import Layout from 'Layouts'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { createProduct, search_in } from 'utils'
import router from 'next/router'

export function CreateProduct() {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (form: any) => {
    setLoading(true)
    const response = await createProduct(form, Cookies.get('token'))
    console.log(response)
    if (response?.status === 'success') {
      toast.success('محصول با موفقیت ساخته شد')
      const {
        data: { data },
      } = await search_in(
        'products',
        {
          key: 'code',
          type: '=',
          value: form?.code,
        },
        router.query,
      )

      reset()
      router.push(`/products/edit/${data[0]?.id}`)
    } else {
      toast.error('ساخت محصول موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  return (
    <Layout title="ساخت محصول">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>ساخت محصول</h1>

        <InputGroup className="col">
          <label>نام محصول</label>
          <input {...register('name', { required: true })} placeholder="نام" />
        </InputGroup>

        <InputGroup className="col mt-4">
          <label>کد محصول</label>
          <input {...register('code', { required: true })} placeholder="کد محصول" />
        </InputGroup>

        <InputGroup className="col mt-4">
          <label>عنوان محصول</label>
          <input {...register('title', { required: true })} placeholder="عنوان محصول" />
        </InputGroup>

        <Button disabled={loading} style={{ width: '10rem', marginTop: '3rem' }} status="Success" appearance="outline">
          {loading ? '...' : 'ساخت محصول'}
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
