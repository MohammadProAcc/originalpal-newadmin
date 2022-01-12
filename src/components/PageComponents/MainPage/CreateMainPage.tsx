import { Button, Checkbox, InputGroup, Select } from '@paljs/ui';
import Layout from 'Layouts';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { create_banner } from 'utils/api/REST/actions/banners';
import { toast } from 'react-toastify';

export function CreateMainPage() {
  // const initialBanner = {
  //   id: 1,
  //   media: {
  //     a: "",
  //     t: "",
  //     p: "",
  //     u: ""
  //   },
  //   content: "Freedom to move, so your imagination can run wild.",
  //   content_color: "0",
  //   title_color: "",
  //   title: "HYPERGLAM COLLECTION - edited",
  //   link: "url/to/site",
  //   priority: 1,
  //   active: 1,
  //   created_at: null,
  //   updated_at: "2021-12-30T04:34:37.000000Z"
  // }

  const platformOptions = [
    { label: 'دسکتاپ', value: 'desktop' },
    { label: 'موبایل', value: 'mobile' },
  ];

  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);

  const { register, handleSubmit, control } = useForm();

  const onSubmit = async (form: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('media[]', form.image);
    delete form.image;
    const finalForm = {
      ...form,
      type: 'slide',
    };
    console.log(finalForm);
    const response = await create_banner(finalForm, Cookies.get('token'));
    console.log(response);
    toast.success('بنر با موفقیت ساخته شد');
    setLoading(false);
  };

  return (
    <Layout title="ساخت بنر صفحه اصلی">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>ساخت بنر صفحه اصلی</h1>

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
                  setActive(e);
                  field.onChange(e);
                }}
              />
            )}
          />
        </InputGroup>

        <InputGroup className="col m-4">
          <label>تصویر بنر</label>
          <InputGroup>
            <input type="file" {...register('image')} />
          </InputGroup>

          <InputGroup>
            <label style={{ width: '6rem' }}>تگ آلت تصویر</label>
            <input {...register('media.a')} placeholder="a" />
          </InputGroup>

          <InputGroup>
            <label style={{ width: '6rem' }}>تگ تایتل تصویر</label>
            <input {...register('media.t')} placeholder="t" />
          </InputGroup>

          <InputGroup>
            <label style={{ width: '6rem' }}>اولویت تصویر</label>
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
  );
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
