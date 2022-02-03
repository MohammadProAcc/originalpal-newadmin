import { Button, Checkbox, InputGroup as _InputGroup, Popover, Select as _Select } from '@paljs/ui'
import Layout from 'Layouts'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { createMainPageSection, translator } from 'utils'
import router from 'next/router'

const sectionTypeOptions = [
  { label: 'محصول', value: 'product' },
  { label: 'لینک', value: 'link' },
  { label: 'بنر', value: 'banner' },
]

export function CreateMainPageSection() {
  const [loading, setLoading] = useState(false)

  const [selectedType, setSelectedType] = useState<any>(null)

  const { register, handleSubmit, control, reset } = useForm()

  const onSubmit = async (form: any) => {
    console.log(form)

    const final = {
      ...form,
      tags: form?.tags?.split(' '),
      brands: form?.brands?.split(' '),
      banners: form?.banners?.split(' '),
    }

    console.log('final', final)

    setLoading(true)
    const response = await createMainPageSection(final, Cookies.get('token'))
    if (response?.status === 'success') {
      toast.success('بخش صفحه اصلی  با موفقیت ساخته شد')
      router.push('/main-page-sections')
      reset()
    } else {
      toast.error('ساخت بخش صفحه اصلی  موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  return (
    <Layout title="ساخت بخش صفحه اصلی  صفحه اصلی">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <label>نوع</label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                options={sectionTypeOptions}
                onChange={(e: any) => {
                  setSelectedType(e?.value)
                  field.onChange(e?.value)
                }}
                placeholder="محصول، لینک، بنر..."
              />
            )}
          />
        </InputGroup>

        <InputGroup>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup>
          <label>اولویت</label>
          <input {...register('priority')} type="number" placeholder="اولویت" />{' '}
        </InputGroup>
        <InputGroup>
          <label>فعال</label>
          <Controller
            name="active"
            control={control}
            render={({ field }) => <Checkbox checked={field?.value} onChange={field?.onChange}></Checkbox>}
          />
        </InputGroup>

        {selectedType === 'product' ? (
          <>
            <H3>جزییات بخش محصول</H3>

            <InputGroup>
              <label>برند ها</label>
              <Popover trigger="focus" placement="top" overlay="شناسه برند های مورد نظر را با فاصله (space) وارد کنید">
                <input {...register('brands')} type="number" />
              </Popover>
            </InputGroup>

            <InputGroup>
              <label>برچسب ها</label>
              <Popover trigger="focus" placement="top" overlay="شناسه برچسب های مورد نظر را با فاصله (space) وارد کنید">
                <input {...register('tags')} type="number" />
              </Popover>
            </InputGroup>

            <InputGroup>
              <label>فقط محصولات موجود</label>
              <Controller
                name="inStock"
                control={control}
                render={({ field }) => <Checkbox checked={field?.value} onChange={field?.onChange}></Checkbox>}
              />
            </InputGroup>
          </>
        ) : selectedType === 'banner' ? (
          <>
            <H3>جزییات بخش بنر</H3>

            <InputGroup>
              <label>بنر ها</label>
              <Popover trigger="focus" placement="top" overlay="شناسه بنر های مورد نظر را با فاصله (space) وارد کنید">
                <input {...register('banners')} type="number" />
              </Popover>
            </InputGroup>
          </>
        ) : (
          <>
            <H3>جزییات بخش لینک</H3>
          </>
        )}

        <Button type="submit" status="Success">
          ساخت بخش
        </Button>
      </Form>
    </Layout>
  )
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  label {
    min-width: 4rem;
  }
`

const InputGroup = styled(_InputGroup)`
  margin: 0 0 1rem 0;
`

const Select = styled(_Select)`
  width: 100%;
`

const H3 = styled.h3`
  margin: 0 0 2rem 0;
`
