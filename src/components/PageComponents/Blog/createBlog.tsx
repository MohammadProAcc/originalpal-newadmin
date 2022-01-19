import { Button, Card, CardBody, CardHeader, Checkbox, InputGroup, Select } from '@paljs/ui';
import Layout from 'Layouts';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { createBlog } from 'utils';
import { BasicEditor } from 'components';

export function CreateBlog() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, control } = useForm();

  const onSubmit = async (form: any) => {
    setLoading(true);
    const response = await createBlog(form, Cookies.get('token'));
    if (response?.status === 'success') {
      toast.success('وبلاگ با موفقیت ساخته شد');
    } else {
      toast.error('ساخت وبلاگ موفقیت آمیز نبود');
    }
    setLoading(false);
  };

  return (
    <Layout title="ساخت وبلاگ صفحه اصلی">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>ساخت وبلاگ</h1>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label></label>
          <Controller
            control={control}
            name="desc"
            render={({ field }) => <BasicEditor callback={field?.onChange} title="محتوا" />}
          />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>اسلاگ</label>
          <input {...register('slug')} placeholder="اسلاگ" />
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
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <Button disabled={loading} style={{ width: '10rem', marginTop: '3rem' }} status="Success" appearance="outline">
          {loading ? '...' : 'ساخت وبلاگ'}
        </Button>
      </Form>
    </Layout>
  );
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
`;
