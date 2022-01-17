import { Button, InputGroup } from '@paljs/ui';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ProductStock } from 'types';

interface IStockItemProps {
  stock: ProductStock;
}
export const StockItem: React.FC<IStockItemProps> = ({ stock }) => {
  // -==>>> Stock Form <<<==-
  const { register, handleSubmit } = useForm({
    defaultValues: stock,
  });

  const onSubmit = async (form: any) => {
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup fullWidth style={{ flexDirection: 'column' }}>
        <label>شناسه انبار</label>
        <input disabled {...register('id')} placeholder="شناسه" />
      </InputGroup>

      <InputGroup fullWidth style={{ flexDirection: 'column' }}>
        <label>شناسه محصول</label>
        <input disabled {...register('product_id')} placeholder="شناسه محصول" />
      </InputGroup>

      <InputGroup fullWidth style={{ flexDirection: 'column' }}>
        <label>سایز</label>
        <input {...register('size')} placeholder="سایز" />
      </InputGroup>

      <InputGroup fullWidth style={{ flexDirection: 'column' }}>
        <label>کد</label>
        <input {...register('code')} placeholder="کد" />
      </InputGroup>

      <InputGroup fullWidth style={{ flexDirection: 'column' }}>
        <label>تعداد</label>
        <input {...register('count')} placeholder="تعداد" />
      </InputGroup>

      <InputGroup fullWidth style={{ flexDirection: 'column' }}>
        <label>قیمت</label>
        <input {...register('price')} placeholder="قیمت" />
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

      <Button status="Info" appearance="hero" className="my-3">
        بروزرسانی انبار
      </Button>
    </form>
  );
};
