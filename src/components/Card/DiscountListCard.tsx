import { InputGroup } from '@paljs/ui'
import React, { useCallback, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { Product } from 'types'
import { getSingleProduct, numeralize, toLocalDate, toLocalTime } from 'utils'

export function DiscountListCard(props: DiscountListCardProps) {
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')
  const [product, setProduct] = useState<Product | null>(null)

  async function fetchProduct() {
    getSingleProduct(props.stock.product_id)
      .then((res) => {
        setProduct(res)
        setStatus('success')
      })
      .catch(() => {
        setStatus('failed')
      })
  }

  const observer = useRef<any>(null)
  const connector = useCallback((node) => {
    if (observer.current) if (typeof observer.current.disconnect === 'object') observer.current.disconncet()

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchProduct()
      }
    })
    if (node) observer.current.observe(node)
  }, [])

  const formMethods = useFormContext();

  function discountMutationObserver(e: any) {
    const fieldName = `${props.stock.id}:${props.stock.product_id}`;
    if (e.target.value == Number(e.target.value)) {
      formMethods.setValue(fieldName, { ...formMethods.getValues(fieldName), discount: e.target.value })
    } else {
      formMethods.setValue(fieldName, { ...formMethods.getValues(fieldName), discount_exp: e.target.value })
    }
  }

  return (
    <Li ref={connector}>
      <div className="col info">
        <strong className="strong">
          <span className="product-id">شناسه محصول :‌ {props.stock.product_id}</span>
        </strong>
        <span>سایز محصول : {props.stock.size}</span>
        <span className="product-id">شناسه انبار :‌ {props.stock.id}</span>
      </div>
      {status === 'success' ? (
        <>
          <ImageContainer>
            <ProductImage src={`${process.env.SRC}/${product?.media?.[0]?.u}`} />
          </ImageContainer>
          <span className="product-name">{product?.name}</span>
          <div className="col price relative">
            <span>قیمت : {numeralize(product?.price ?? 0)}</span>
            <span>
              تاریخ پایان تخفیف :{' '}
              {toLocalTime(product?.discount_exp as any) + ' - ' + toLocalDate(product?.discount_exp as any)}
              <InputGroup>
                <input type="date" onChange={discountMutationObserver} />
              </InputGroup>
            </span>
          </div>
          <div className="col price discount">
            <span>قیمت با تخفیف :</span> <InputGroup>
              <input defaultValue={product?.discount_price} type="number" onChange={discountMutationObserver} />
            </InputGroup>

          </div>
        </>
      ) : status === 'loading' ? (
        'در حال بارگذاری محصول...'
      ) : (
        ''
      )}
    </Li >
  )
}

interface DiscountListCardProps {
  stock: {
    id: number
    size: string
    product_id: number
    priceAfterDiscount: number
    product: Product
  }
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
      max-width: 20rem;
      &.discount {
        max-width: 12rem;
      }
    }
    &.relative {
      position: relative;
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

  input[type="number"] {
    max-width: 10rem;
  }

  input[type="date"] {
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
