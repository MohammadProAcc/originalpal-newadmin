import { InputGroup as _InputGroup } from '@paljs/ui'
import _Select from 'react-select'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { Product, Stock } from 'types'
import { numeralize, toLocalDate, toLocalTime } from 'utils'

const percentageSelectOptions = [
  { label: 'درصدی', value: 'percent' },
  { label: 'نقدی', value: 'cash' },
]

export function DiscountListCard(props: DiscountListCardProps) {
  const [product, setProduct] = useState<Product | null>(props.stock.product)
  const fieldName = `${props.stock.id}:${props.stock.product_id}`

  const formMethods = useFormContext()

  function discountMutationObserver(e: any) {
    if (e.target.value == Number(e.target.value)) {
      formMethods.setValue(fieldName, {
        ...props.stock,
        ...formMethods.getValues(fieldName),
        discount_amout: e.target.value,
      })
    } else {
      formMethods.setValue(fieldName, {
        ...props.stock,
        ...formMethods.getValues(fieldName),
        discount_end: e.target.value,
      })
    }
  }

  function discountStartMutation(e: any) {
    formMethods.setValue(fieldName, {
      ...props.stock,
      ...formMethods.getValues(fieldName),
      discount_start: e.target.value,
    })
  }

  function discountTypeMutationObserver(e: any) {
    formMethods.setValue(fieldName, { ...props.stock, ...formMethods.getValues(fieldName), discount_type: e.value })
  }

  return (
    <Li>
      <div className="col info">
        <strong className="strong">
          <span className="product-id">شناسه محصول :‌ {props.stock.product_id}</span>
        </strong>
        <span>سایز محصول : {props.stock.size}</span>
        <span className="product-id">شناسه انبار :‌ {props.stock.id}</span>
      </div>

      <ImageContainer>
        <ProductImage src={`${process.env.SRC}/${product?.site_main_picture?.u}`} />
      </ImageContainer>
      <span className="product-name">{product?.name}</span>
      <div className="col price date">
        <FlexBox className="price">قیمت : <strong>{numeralize(props.stock?.price ?? 0)}</strong> تومان</FlexBox>
        <FlexBox col>
          تاریخ شروع تخفیف :{' '}
          {props.stock.discount_start &&
            toLocalTime(props.stock?.discount_start as any) +
            ' - ' +
            toLocalDate(props.stock?.discount_start as any)}
          <InputGroup>
            <input type="date" onChange={discountStartMutation} />
          </InputGroup>
        </FlexBox>
        <FlexBox col>
          تاریخ پایان تخفیف :{' '}
          {props.stock.discount_end &&
            toLocalTime(props.stock?.discount_end as any) + ' - ' + toLocalDate(props.stock?.discount_end as any)}
          <InputGroup>
            <input type="date" onChange={discountMutationObserver} />
          </InputGroup>
        </FlexBox>
      </div>
      <div className="col price discount">
        <FlexBox className="discount">
          <InputGroup column>
            <label>نوع تخفیف :</label>
            <Select
              options={percentageSelectOptions}
              onChange={discountTypeMutationObserver}
              defaultValue={percentageSelectOptions.find((item) => item.value === props.stock.discount_type)}
            />
          </InputGroup>

          <InputGroup column>
            <label>مقدار تخفیف :</label>
            <input defaultValue={props.stock?.discount_amout} type="number" onChange={discountMutationObserver} />
          </InputGroup>
        </FlexBox>
      </div>

    </Li>
  )
}

interface DiscountListCardProps {
  stock: Stock
}

const Li = styled.li`
  width: 100%;
  height: 5rem;
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: white;

  list-style: none;

  .col {
    &.info {
      max-width: 12rem;
    }
    &.price {
      &.date {
        display: flex;
        flex-direction: row;
        column-gap: 1rem;
      }

      &.discount {
        max-width: 20rem;
        height: 100%;
      }
    }
    flex-direction: column;
    display: inline-flex;
    justify-content: space-around;
  }
  .strong {
    font-size: 1rem;
    font-weight: 900;
    text-decoration: underline;
  }

  .product-id {
    display: inline-block;
  }

  .product-name {
    display: inline-block;

    max-width: 30%;
    margin-left: auto;
  }

  input[type='number'] {
    max-width: 10rem;
  }

  input[type='date'] {
    height: 1.5rem;
    padding: 0;
    margin-top: 0.125rem;
  }

  > * {
    flex: 1;
  }
`

const ImageContainer = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`

const ProductImage = styled.img`
  width: 6rem;
  height: 100%;
  margin-left: 1rem;

  object-fit: cover;
`

const Select = styled(_Select)`
  height: 2rem;
`

const FlexBox = styled.div<{ col?: boolean }>`
  &.discount {
    min-width: 40rem;
  }

  &.price {
    white-space: nowrap;

    strong {
      margin: 0 0.25rem;
      font-weight: bolder;
    }
  }

  display: flex;
  flex-direction: ${(props) => props.col && 'column'};
`

const InputGroup = styled(_InputGroup) <{ column?: boolean }>`
  display: flex;
  flex-direction: ${(props) => props.column && 'column'};
`
