import { Button, Card, CardBody, CardHeader, InputGroup } from '@paljs/ui'
import Cookies from 'js-cookie'
import Layout from 'Layouts'
import router from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { createCoupon } from 'utils'

export function CreateCoupon() {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (form: any) => {
    setLoading(true)
    const response = await createCoupon(form, Cookies.get(process.env.TOKEN!))
    if (response?.status === 'success') {
      reset()
      toast.success('کوپن با موفقیت ساخته شد')
      router.push('/coupons')
    } else {
      toast.error('ساخت کوپن موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  return (
    <Layout title="ساخت کوپن صفحه اصلی">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ marginBottom: '3rem' }}>ساخت کوپن</h1>

        <Card>
          <CardHeader>کد کوپن</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('code', { required: true })} placeholder="کد کوپن" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>توضیحات</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('decription', { required: true })} placeholder="توضیحات" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>نوع</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('type', { required: true })} placeholder="نوع" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>مقدار</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('amount', { required: true })} type="number" placeholder="مقدار" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>شروع</CardHeader>
          <CardBody>
            <InputGroup>
              <input type="date" {...register('start', { required: true })} placeholder="شروع" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>تاریخ انقضاء</CardHeader>
          <CardBody>
            <InputGroup>
              <input type="date" {...register('expiration', { required: true })} placeholder="تاریخ انقضاء" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>حداکثر</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('max', { required: true })} placeholder="حداکثر" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>deny_off</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('deny_off', { required: true })} placeholder="deny_off" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>محدودیت</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('limit', { required: true })} placeholder="محدودیت" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>شناسه کاربر</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('user_id', { required: true })} placeholder="شناسه کاربر" />
            </InputGroup>
          </CardBody>
        </Card>

        <Button disabled={loading} style={{ width: '10rem', marginTop: '3rem' }} status="Success" appearance="outline">
          {loading ? '...' : 'ساخت کوپن'}
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
