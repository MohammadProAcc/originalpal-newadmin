import { Button, Card, CardBody, CardHeader, Checkbox, InputGroup, Popover, Radio, Select } from '@paljs/ui'
import Layout from 'Layouts'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { createMenu, search_in } from 'utils'
import { BasicEditor } from 'components'
import router from 'next/router'

export function CreateMenu() {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (form: any) => {
    setLoading(true)
    const response = await createMenu(form)
    if (response === null) {
      reset()
      toast.success('منو با موفقیت ساخته شد')
      router.push('/menu')
    } else {
      toast.error('ساخت منو موفیت آمیز نبود')
    }
    setLoading(false)
  }

  return (
    <Layout title="ساخت منو ">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>
          <span style={{ margin: '0 0 0 1rem' }}>ساخت منو</span>
        </h1>

        <InputGroup>
          <label>نوع</label>
          <input {...register('type')} placeholder="نوع" />
        </InputGroup>

        <InputGroup>
          <label>موارد</label>
          <Popover
            trigger="focus"
            placement="top"
            overlay={
              <p>
                منوی ساخته شده توسط{' '}
                <a href="https://www.jqueryscript.net/demo/Drag-Drop-Menu-Builder-For-Bootstrap">ابزار منو ساز</a> را در
                انی مورودی کپی منید
              </p>
            }
          >
            <textarea {...register('items')} placeholder="موارد" />
          </Popover>
        </InputGroup>

        <Button disabled={loading} style={{ width: '10rem', marginTop: '3rem' }} status="Success" appearance="outline">
          {loading ? '...' : 'ساخت منو'}
        </Button>
      </Form>
    </Layout>
  )
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 2rem;
  }

  .col {
    flex-direction: column;
  }

  label {
    min-width: 3rem;
    margin-bottom: 1rem;
  }
`
