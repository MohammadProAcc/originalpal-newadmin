import { Button, InputGroup, Select } from '@paljs/ui'
import Layout from 'Layouts'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { createStock, translator } from 'utils'
import { StockForm } from './components'

const discoutTypeOptions = [
  { label: 'نقدی', value: 'cash' },
  { label: 'درصدی', value: 'percent' },
]

export function CreateStock() {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, control, reset } = useForm()

  const onSubmit = async (form: any) => {
    setLoading(true)
    const response = await createStock(form, Cookies.get(process.env.TOKEN!))
    if (response?.status === 'success') {
      toast.success('انبار با موفقیت ساخته شد')
      reset()
    } else {
      if (JSON.stringify(response).includes('The code has already been taken.')) {
        toast.error('کد قبلا استفاده شده است')
      } else {
        toast.error('ساخت انبار موفقیت آمیز نبود')
      }
    }
    setLoading(false)
  }

  return (
    <Layout title="ساخت انبار صفحه اصلی">
      <StockForm />
    </Layout>
  )
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`
