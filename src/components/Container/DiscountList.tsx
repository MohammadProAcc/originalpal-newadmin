import styled from 'styled-components'
import { DiscountListCard } from 'components'
import { Product } from 'types'
import { FormProvider, useForm } from 'react-hook-form'
import { Button, InputGroup as _InputGroup } from '@paljs/ui';

export function DiscountList(props: DiscountListProps) {

  const formMethods = useForm();

  async function onSubmitDiscountForm(form: any) {
    // TODO: add submition functionality
    console.log(form);
  }

  async function searchCallback(e: any) {
    // TODO: add search functionality
    console.log(e.target.value)
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmitDiscountForm)}>
        <InputGroup>
          <Button type="submit" >
            ثبت تخفیفات
          </Button>
          <input placeholder="جستجو" onChange={searchCallback} />
        </InputGroup>
        <Ul>
          {props.stocks.filter(_stock => !!_stock.product).slice(0, 50).map((_stock) => (
            <DiscountListCard key={_stock.id} stock={_stock} />
          ))}
        </Ul>
      </form>
    </FormProvider>
  )
}

export interface DiscountListProps {
  stocks: {
    id: number
    size: string
    product_id: number
    priceAfterDiscount: number
    product: Product
  }[]
}

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
`

const InputGroup = styled(_InputGroup)`
  margin-bottom: 2rem;
  margin-right: 2.5rem;

  input {
    width: 100%;
    margin-right: 1rem;
  }
`
