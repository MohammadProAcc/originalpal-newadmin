import { Button, Checkbox, InputGroup, Select } from '@paljs/ui';
import Layout from 'Layouts';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { create_banner } from 'utils/api/REST/actions/banners';
import { toast } from 'react-toastify';
import { useStore } from 'utils';
import { updateBanner } from 'utils/api/REST/actions/banners/updateBanner';
import { useRouter } from 'next/router';

export function EditMainPage() {
  const router = useRouter();

  const { banner } = useStore((state: any) => ({
    banner: state?.banner,
  }));

  const platformOptions = [
    { label: 'دسکتاپ', value: 'desktop' },
    { label: 'موبایل', value: 'mobile' },
  ];

  const [platform, setPlatform] = useState<any>(
    platformOptions.find((option: any) => option?.value === banner?.platform),
  );

  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(!!banner?.active);

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      ...(banner ?? null),
    },
  });

  const onSubmit = async (form: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('media[]', form.image);
    delete form.image;
    const finalForm = {
      ...form,
      platform: platform?.value,
      active,
      type: 'slide',
      // formData
    };
    const response = await updateBanner(router?.query?.banner_id as string, finalForm, Cookies.get('token') ?? '');
    if (response?.status === 'success') {
      toast.info('بنر با موفقیت بروزرسانی شد');
    } else {
      toast.error('بروزرسانی بنر موفقیت آمیز نبود');
    }
    setLoading(false);
  };

  return (
    <Layout title="ساخت بنر صفحه اصلی">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>بروزرسانی بنر صفحه اصلی (شناسه: {banner?.id})</h1>

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

            <Select options={platformOptions} className="w-25" value={platform} onChange={(v) => setPlatform(v)} />
          </InputGroup>
        </InputGroup>

        <InputGroup className="mt-4">
          <label>اولویت</label>
          <input type="number" {...register('priority', { required: true })} placeholder="اولویت" />
        </InputGroup>

        <InputGroup className="mt-4">
          <label>فعال بودن</label>
          <Checkbox checked={active} onChange={(e: any) => setActive(e)} />
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
          <Button disabled={loading} status="Info" appearance="outline" className="mt-5" type="submit">
            {loading ? '...' : 'بروزرسانی بنر'}
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
