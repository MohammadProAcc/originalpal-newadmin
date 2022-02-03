import { Button, InputGroup, Select } from '@paljs/ui'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { createStock, editStock } from 'utils'

const discoutTypeOptions = [
  { label: 'نقدی', value: 'cash' },
  { label: 'درصدی', value: 'percent' },
]

export interface IStockFormProps {
  defaultValues?: any
  callback?: any
}

export const StockForm: React.FC<IStockFormProps> = ({ defaultValues, callback }) => {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, control } = useForm({
    defaultValues,
  })

  const onSubmit = async (form: any) => {
    setLoading(true)

    if (defaultValues) {
      const response = await editStock(form, Cookies.get('token'))
      if (response?.status === 'success') {
        await callback(response)
        toast.success('انبار با موفقیت بروز شد')
      } else {
        toast.error('بروزرسانی انبار موفقیت آمیز نبود')
      }
    } else {
      const response = await createStock(form, Cookies.get('token'))
      if (response?.status === 'success') {
        callback(response)
        toast.success('انبار با موفقیت ساخته شد')
      } else {
        toast.error('ساخت انبار موفقیت آمیز نبود')
      }
    }

    setLoading(false)
  }

  return (
    <Component>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>ساخت انبار</h1>

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>شناسه محصول</label>
          <input {...register('product_id', { required: true })} placeholder="شناسه محصول" />
        </InputGroup>

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>سایز</label>
          <input {...register('size', { required: true })} placeholder="سایز" />
        </InputGroup>

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>قیمت</label>
          <input {...register('price', { required: true })} placeholder="قیمت" />
        </InputGroup>

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>تعداد</label>
          <input {...register('count', { required: true })} placeholder="تعداد" />
        </InputGroup>

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>کد</label>
          <input {...register('code')} placeholder="کد" />
        </InputGroup>

        {/* <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>قیمت بعد از تخفیف</label>
          <input {...register('priceAfterDiscount')} placeholder="قیمت بعد از تخفیف" />
        </InputGroup> */}

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>نوع تخفیف</label>
          <Controller
            control={control}
            name="discount_type"
            render={({ field }) => (
              <Select
                options={discoutTypeOptions}
                onChange={(e) => field?.onChange(e?.value)}
                placeholder="نوع تخفیف"
              />
            )}
          />
        </InputGroup>

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>مقدار تخفیف</label>
          <input {...register('discount_amout')} placeholder="مقدار تخفیف" />
        </InputGroup>

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>شروع تخفیف</label>
          <input type="date" {...register('discount_start')} placeholder="شروع تخفیف" />
        </InputGroup>

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>پایان تخفیف</label>
          <input type="date" {...register('discount_end')} placeholder="پایان تخفیف" />
        </InputGroup>

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>توضیحات سایز</label>
          <input {...register('disc')} placeholder="توضیحات سایز" />
        </InputGroup>

        <Button disabled={loading} style={{ width: '10rem', marginTop: '3rem' }} status="Success" appearance="outline">
          {loading ? '...' : defaultValues ? 'ساخت انبار' : 'بروزرسانی انبار'}
        </Button>
      </Form>
    </Component>
  )
}

export const Component = styled.div``

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`
