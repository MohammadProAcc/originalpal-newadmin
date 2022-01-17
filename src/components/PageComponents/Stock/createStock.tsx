import { Button, InputGroup } from '@paljs/ui';
import Layout from 'Layouts';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { createStock } from 'utils';

export function CreateStock() {
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

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>شناسه محصول</label>
          <input {...register('product_id', { required: true })} placeholder="شناسه محصول" />
        </InputGroup>

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>سایز</label>
          <input {...register('size', { required: true })} placeholder="سایز" />
        </InputGroup>

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>قیمت</label>
          <input {...register('price', { required: true })} placeholder="قیمت" />
        </InputGroup>

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>تعداد</label>
          <input {...register('count', { required: true })} placeholder="تعداد" />
        </InputGroup>

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>کد</label>
          <input {...register('code')} placeholder="کد" />
        </InputGroup>

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>قیمت بعد از تخفیف</label>
          <input {...register('priceAfterDiscount')} placeholder="قیمت بعد از تخفیف" />
        </InputGroup>

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>نوع تخفیف</label>
          <input {...register('discount_type')} placeholder="نوع تخفیف" />
        </InputGroup>

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>مقدار تخفیف</label>
          <input {...register('discount_amout')} placeholder="مقدار تخفیف" />
        </InputGroup>

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>شروع تخفیف</label>
          <input {...register('discount_start')} placeholder="شروع تخفیف" />
        </InputGroup>

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>پایان تخفیف</label>
          <input {...register('discount_end')} placeholder="پایان تخفیف" />
        </InputGroup>

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>قیمت بعد از تخفیف</label>
          <input {...register('priceAfterDiscount')} placeholder="قیمت بعد از تخفیف" />
        </InputGroup>

        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <label>توضیحات سایز</label>
          <input {...register('disc')} placeholder="توضیحات سایز" />
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
