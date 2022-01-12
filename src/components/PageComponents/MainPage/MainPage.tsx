import Layout from 'Layouts';
import { useStore } from 'utils';
import { Button, Checkbox, InputGroup, Select } from '@paljs/ui';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

export const MainPage: React.FC = () => {
  const { banner } = useStore((state: any) => ({
    banner: state?.banner,
  }));
  console.log(banner);

  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      ...(banner ?? {}),
    },
  });

  const platformOptions = [
    { label: 'دسکتاپ', value: 'desktop' },
    { label: 'موبایل', value: 'mobile' },
  ];

  const typeOptions = [
    { label: 'اسلاید', value: 'slide' },
    { label: 'ایستاده', value: 'stand' },
  ];

  const onSubmit = async (form: any) => {
    setLoading(true);
    console.log(form);
    setLoading(false);
  };

  return (
    <Layout title="بنر صفحه اصلی">
      <h1 style={{ marginBottom: '3rem' }}>بنر شماره {banner?.id ?? '?'}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          <Button disabled={loading} status="Info" type="submit">
            {loading ? '...' : 'بروزرسانی بنر'}
          </Button>
        </InputGroup>
      </Form>
    </Layout>
  );
};

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
