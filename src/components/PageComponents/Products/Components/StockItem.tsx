import { Button, InputGroup, Select } from '@paljs/ui'
import Cookies from 'js-cookie'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ProductStock } from 'types'
import { editStock, toLocalDate, translator } from 'utils'

const discoutTypeOptions = [
  { label: 'نقدی', value: 'cash' },
  { label: 'درصدی', value: 'percent' },
]

interface IStockItemProps {
  stock: ProductStock
  callback?: any
}
export const StockItem: React.FC<IStockItemProps> = ({ stock, callback }) => {
  // -==>>> Stock Form <<<==-
  const {
    register,
    handleSubmit,
    getValues,
    formState: { dirtyFields },
    control,
  } = useForm({
    defaultValues: stock,
  })
  type StockForm = Required<typeof dirtyFields>

  const onSubmit = async (form: StockForm) => {
    for (let key in form) {
      if (!dirtyFields[key as keyof StockForm]) {
        delete form[key as keyof StockForm]
      }
    }
    const response = await editStock(stock?.id, form, Cookies.get(process.env.TOKEN!))
    if (response === null) {
      await callback()
      toast.success('انبار با موفقیت بروز شد')
    } else {
      toast.error('بروزرسانی انبار موفقیت آمیز نبود')
    }
  }

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
        <label>نوع تخفیف : {translator(stock.discount_type) ?? 'بدون تخفیف'}</label>
        <Controller
          control={control}
          name="discount_type"
          render={({ field }) => (
            <Select
              options={discoutTypeOptions}
              onChange={(e) => field?.onChange(e?.value)}
              placeholder="برای بروزرسانی نوع تخفیف کلیک کنید"
            />
          )}
        />
      </InputGroup>

      <InputGroup fullWidth style={{ flexDirection: 'column' }}>
        <label>مقدار تخفیف</label>
        <input {...register('discount_amout')} placeholder="مقدار تخفیف" />
      </InputGroup>

      <InputGroup fullWidth style={{ flexDirection: 'column' }}>
        <label>
          شروع تخفیف : <span>{toLocalDate(getValues('discount_start')) ?? ''}</span>
        </label>

        <input type="date" {...register('discount_start')} placeholder="شروع تخفیف" />
      </InputGroup>

      <InputGroup fullWidth style={{ flexDirection: 'column' }}>
        <label>
          پایان تخفیف : <span>{toLocalDate(getValues('discount_end')) ?? ''}</span>
        </label>
        <input type="date" {...register('discount_end')} placeholder="پایان تخفیف" />
      </InputGroup>

      <InputGroup fullWidth style={{ flexDirection: 'column' }}>
        <label>قیمت بعد از تخفیف</label>
        <input disabled {...register('priceAfterDiscount')} placeholder="قیمت بعد از تخفیف" />
      </InputGroup>

      <InputGroup fullWidth style={{ flexDirection: 'column' }}>
        <label>توضیحات سایز</label>
        <input {...register('disc')} placeholder="توضیحات سایز" />
      </InputGroup>

      <Button type="submit" status="Info" appearance="hero" className="my-3">
        بروزرسانی انبار
      </Button>
    </form>
  )
}
