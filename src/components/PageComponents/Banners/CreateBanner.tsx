import { Button, Checkbox, InputGroup, Select } from '@paljs/ui'
import Cookies from 'js-cookie'
import Layout from 'Layouts'
import router from 'next/router'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { admin, search_in } from 'utils'
import { createBanner, uploadBannerImage } from 'utils/api/REST/actions/banners'

export function CreateBanner() {
  const platformOptions = [
    { label: 'دسکتاپ', value: 'desktop' },
    { label: 'موبایل', value: 'mobile' },
  ]

  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(false)

  const { register, handleSubmit, control, reset } = useForm()

  const onSubmit = async (form: any) => {
    setLoading(true)

    const finalForm = {
      ...form,
      type: 'stand',
    }
    delete finalForm?.image

    try {
      const bannerCreationResponse = await createBanner(finalForm, Cookies.get('token'))
      console.log('banner creation response', bannerCreationResponse)
      const result = await search_in('banners', { key: 'content', type: '=', value: form?.content }, router?.query)
      const bannerId = result?.data?.data[0]?.id

      const formData = new FormData()
      formData.append('image', form?.image[0])

      const uploadResponse = await uploadBannerImage(bannerId, formData)
      console.log('Upload Response >>>', uploadResponse)

      const { data: response } = await admin().post(`/banners/image/${bannerId}`, formData)
      console.log(response)

      reset()

      toast.success('بنر با موفقیت ساخته شد')

      router.push('/banners')
    } catch (err) {
      toast.error('بنر با موفقیت ساخته شد')
    }

    setLoading(false)
  }

  return (
    <Layout title="ساخت بنر">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>ساخت بنر</h1>

        <InputGroup className="col">
          <label>عنوان</label>
          <InputGroup className="flex ali-end">
            <input {...register('title', { required: true })} placeholder="عنوان" />
            <input {...register('title_color', { required: true })} type="color" placeholder="عنوان" />
            <label>رنگ عنوان</label>
          </InputGroup>
        </InputGroup>

        <InputGroup className="col mt-4">
          <label>محتوا</label>
          <InputGroup className="flex ali-end">
            <textarea className="w-100" {...register('content', { required: true })} placeholder="محتوا" />

            <input {...register('content_color', { required: true })} type="color" placeholder="رنگ محتوا" />
            <label>رنگ محتوا</label>
          </InputGroup>

          <InputGroup className="mt-4">
            <label>لینک</label>
            <input {...register('link', { required: true })} placeholder="لینک" />
          </InputGroup>

          <InputGroup className="mt-5">
            <label>پلتفرم بنر</label>

            <Controller
              name="platform"
              rules={{
                required: true,
              }}
              control={control}
              render={({ field }) => (
                <Select
                  options={platformOptions}
                  className="w-25"
                  onChange={({ value }: any) => field.onChange(value)}
                />
              )}
            />
          </InputGroup>
        </InputGroup>

        <InputGroup className="mt-4">
          <label>اولویت</label>
          <input type="number" {...register('priority', { required: true })} placeholder="اولویت" />
        </InputGroup>

        <InputGroup className="mt-4">
          <label>فعال بودن</label>
          <Controller
            name="active"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={active}
                {...register('priority', { required: true })}
                onChange={(e: any) => {
                  setActive(e)
                  field.onChange(e)
                }}
              />
            )}
          />
        </InputGroup>

        <InputGroup className="col m-4">
          <label>تصویر بنر</label>
          <InputGroup style={{ marginBottom: '1rem' }}>
            <input type="file" {...register('image')} />
          </InputGroup>

          <label style={{ width: '100%' }}>تگ alt تصویر</label>
          <InputGroup>
            <input {...register('media.a')} placeholder="a" />
          </InputGroup>

          <label style={{ width: '100%' }}>تگ title تصویر</label>
          <InputGroup>
            <input {...register('media.t')} placeholder="t" />
          </InputGroup>

          <label style={{ width: '100%' }}>اولویت تصویر</label>
          <InputGroup>
            <input {...register('media.p')} type="number" placeholder="p" />
          </InputGroup>
        </InputGroup>

        <InputGroup status="Success">
          <Button disabled={loading} status="Success" type="submit">
            {loading ? '...' : 'افزودن بنر'}
          </Button>
        </InputGroup>
      </Form>
    </Layout>
  )
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`
