import { Button, InputGroup } from '@paljs/ui';
import Layout from 'Layouts';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { createStock } from 'utils';

export function Createstock() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (form: any) => {
    setLoading(true);
    const response = await createStock(form, Cookies.get('token'));
    if (response?.status === 'success') {
      toast.success('انبار با موفقیت ساخته شد');
    } else {
      toast.error('ساخت انبار موفقیت آمیز نبود');
    }
    setLoading(false);
  };

  return (
    <Layout title="ساخت انبار صفحه اصلی">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>ساخت انبار</h1>

        <InputGroup className="col">
          <label>شناسه محصول</label>
          <input {...register('product_id', { required: true })} placeholder="شناسه محصول" />
        </InputGroup>

        <InputGroup className="col">
          <label>تعداد</label>
          <input {...register('count', { required: true })} placeholder="تعداد" />
        </InputGroup>

        <InputGroup className="col">
          <label>سایز</label>
          <input {...register('product_id', { required: true })} placeholder="سایز" />
        </InputGroup>

        <InputGroup className="col">
          <label>قیمت</label>
          <input {...register('price', { required: true })} type="number" placeholder="قیمت" />
        </InputGroup>

        <Button disabled={loading} style={{ width: '10rem', marginTop: '3rem' }} status="Success" appearance="outline">
          {loading ? '...' : 'ساخت انبار'}
        </Button>
      </Form>
    </Layout>
  );
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
