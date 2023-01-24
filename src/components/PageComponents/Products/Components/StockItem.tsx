import { Badge, Flex } from '@mantine/core'
import { Button, InputGroup, Select } from '@paljs/ui'
import { PersianDatePicker } from 'components/Input'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ProductStock } from 'types'
import { editStock, numeralize, toLocalDate, translator } from 'utils'

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
    formState: { dirtyFields },
    control,
    watch,
  } = useForm({
    defaultValues: {
      ...stock,
      discount_start: `${new Date(stock.discount_start ?? '')}`,
      discount_end: `${new Date(stock.discount_end ?? '')}`,
      discount_type: `${new Date(stock.discount_type ?? '')}`,
    },
  })
  type StockForm = Required<typeof dirtyFields>

  const [loading, setLoading] = useState(false)
  const onSubmit = async (form: StockForm) => {
    setLoading(true)
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

    setLoading(false)
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
        <label>قیمت (ريال)</label>
        <input {...register('price')} placeholder="قیمت" />
      </InputGroup>

      <Flex gap="lg" align="center">
        <InputGroup fullWidth style={{ flex: '1', flexDirection: 'column' }}>
          <label>
            نوع تخفیف : <strong>{translator(stock.discount_type) ?? 'بدون تخفیف'}</strong>
          </label>
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

        <InputGroup fullWidth style={{ flex: '1', flexDirection: 'column' }}>
          <label>مقدار تخفیف (ريال یا درصد)</label>
          <input {...register('discount_amout')} placeholder="مقدار تخفیف" />
        </InputGroup>

        <Flex pt="xl" style={{ flex: '1' }} justify="center" align="center" gap="lg">
          <Badge color="cyan" size="lg">
            قیمت بعد از تخفیف:
          </Badge>
          {numeralize(watch('priceAfterDiscount'))} ريال
        </Flex>
      </Flex>

      <Flex gap="lg">
        <Controller
          name="discount_start"
          control={control}
          render={({ field }) => (
            <PersianDatePicker
              value={watch('discount_start')}
              onSelect={field.onChange}
              title={
                <label>
                  شروع تخفیف : <span>{toLocalDate(watch('discount_start')) ?? ''}</span>
                </label>
              }
            />
          )}
        />

        <Controller
          name="discount_end"
          control={control}
          render={({ field }) => (
            <PersianDatePicker
              value={watch('discount_end')}
              onSelect={field.onChange}
              title={
                <label>
                  پایان تخفیف : <span>{toLocalDate(watch('discount_end')) ?? ''}</span>
                </label>
              }
            />
          )}
        />
      </Flex>

      <InputGroup fullWidth style={{ flexDirection: 'column' }}>
        <label>توضیحات سایز</label>
        <input {...register('disc')} placeholder="توضیحات سایز" />
      </InputGroup>

      <Button type="submit" status="Info" appearance="hero" className="my-3" disabled={loading}>
        بروزرسانی انبار
      </Button>
    </form>
  )
}
