import { Button, Card, CardBody, CardHeader, Checkbox, InputGroup, Radio, Select } from '@paljs/ui'
import Layout from 'Layouts'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { createBlog, editBlog, search_in, uploadBlogImage } from 'utils'
import { BasicEditor } from 'components'
import router from 'next/router'

export function CreateBlog() {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, control } = useForm()

  const onSubmit = async (form: any) => {
    setLoading(true)

    // FIXME: temporary
    const srcvideo = form?.srcvideo
    delete form?.srcvideo

    const thumb = form?.thumb[0]
    delete form?.thumb

    const endImage = form?.endimage[0]
    delete form?.endimage

    const response = await createBlog(form, Cookies.get('token'))
    if (response !== null) {
      const { data: blogs } = await search_in('blog', { key: 'title', type: '=', value: form?.title }, router?.query)
      const blogId = blogs?.data[blogs?.total - 1]?.id
      console.log('blogId', blogId)

      const thumbUploadResponse = await uploadBlogImage(blogId, 'thumb', thumb)
      if (thumbUploadResponse?.status === 'success') toast.success('تصویر بنر وبلاگ آپلود شد')

      const endimageUploadResponse = await uploadBlogImage(blogId, 'endimage', endImage)
      if (endimageUploadResponse?.status === 'success') toast.success('تصویر پایانی وبلاگ آپلود شد')

      const srcvideoUploadResponse = await uploadBlogImage(blogId, 'srcvideo', srcvideo)
      if (srcvideoUploadResponse?.status === 'success') toast.success('ویدیو وبلاگ آپلود شد')

      toast.success('وبلاگ با موفقیت ساخته شد')
      router.push(`/blog/edit/${blogId}`)
    } else {
      toast.error('ساخت وبلاگ موفقیت آمیز نبود')
    }

    setLoading(false)
  }

  return (
    <Layout title="ساخت وبلاگ ">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>
          <span style={{ margin: '0 0 0 1rem' }}>ساخت وبلاگ</span>
          <Controller
            name="is_news"
            control={control}
            render={({ field }) => (
              // <Checkbox checked={field.value} onChange={(e: any) => field.onChange(e ? 1 : 0)}>
              <Checkbox checked={field.value} onChange={(e: any) => field.onChange(e ? 1 : 0)}>
                اخبار
              </Checkbox>
            )}
          />
        </h1>

        <InputGroup className="col mb-4" fullWidth>
          <label>عنوان</label>
          <input {...register('title', { required: true })} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <Controller
            control={control}
            name="desc"
            rules={{
              required: true,
            }}
            render={({ field }) => <BasicEditor callback={field?.onChange} title="محتوا" />}
          />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>اسلاگ</label>
          <input {...register('slug', { required: true })} placeholder="اسلاگ" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>نویسنده</label>
          <input {...register('writer')} placeholder="نویسنده" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>برچسب ها</label>
          <input {...register('labels')} placeholder="برچسب ها" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>دسته بندی ها</label>
          <input {...register('show_categories')} placeholder="دسته بندی ها" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>تصویر بنر</label>
          <input type="file" {...register('thumb')} placeholder="تصویر بنر" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>خلاصه</label>
          <Controller
            control={control}
            name="summary"
            render={({ field }) => <BasicEditor callback={field?.onChange} title="خلاصه" />}
          />
        </InputGroup>

        <Card>
          <CardHeader>SEO</CardHeader>
          <CardBody>
            <InputGroup className="col" fullWidth>
              <label>کلمات مترادف (meta_keywords)</label>
              <input {...register('meta_keywords')} placeholder="کلمات مترادف" />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>عنوان متا</label>
              <input {...register('meta_title')} placeholder="عنوان متا" />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>توضیحات متا</label>
              <input {...register('meta_description')} placeholder="توضیحات متا" />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>عنوان صفحه</label>
              <input {...register('title_page')} placeholder="عنوان" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>تصویر پایانی</CardHeader>
          <CardBody>
            <InputGroup className="col" fullWidth>
              <label>تصویر پایانی</label>
              <input type="file" {...register('endimage')} placeholder="تصویر پایانی" />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>عنوان پایانی</label>
              <input {...register('endtitle')} placeholder="عنوان پایانی" />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>تگ آلت تصویر پایانی</label>
              <input {...register('endtitle')} placeholder="تگ آلت تصویر پایانی" />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>متن تصویر پایانی</label>
              <input {...register('endtext')} placeholder="متن تصویر پایانی" />
            </InputGroup>
          </CardBody>
        </Card>

        <InputGroup className="col" fullWidth>
          <label>is board</label>
          <Controller
            control={control}
            name="isboard"
            render={({ field }) => <Checkbox checked={field?.value} {...field} />}
          />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>is highlight</label>
          <Controller
            control={control}
            name="ishighlight"
            render={({ field }) => <Checkbox checked={field?.value} {...field} />}
          />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>is top</label>
          <Controller
            control={control}
            name="istop"
            render={({ field }) => <Checkbox checked={field?.value} {...field} />}
          />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>is cast</label>
          <Controller
            control={control}
            name="iscast"
            render={({ field }) => <Checkbox checked={field?.value} {...field} />}
          />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>ویدیو دارد؟</label>
          <Controller
            control={control}
            name="isvideo"
            render={({ field }) => <Checkbox checked={field?.value} {...field} />}
          />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>فایل ویدیویی</label>
          <input type="file" {...register('srcvideo')} placeholder="فایل ویدیویی" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>هدر ها</label>
          <input {...register('headers')} placeholder="هدر ها" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>ترند</label>
          <input {...register('trend')} placeholder="ترند" />
        </InputGroup>

        <Button disabled={loading} style={{ width: '10rem', marginTop: '3rem' }} status="Success" appearance="outline">
          {loading ? '...' : 'ساخت وبلاگ'}
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
    margin-bottom: 1rem;
  }
`
