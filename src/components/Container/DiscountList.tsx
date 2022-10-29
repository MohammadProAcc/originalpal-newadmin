import styled from 'styled-components'
import { DiscountListCard } from 'components'
import { FormProvider, useForm } from 'react-hook-form'
import { Button, InputGroup as _InputGroup } from '@paljs/ui'
import { pluralEditStock } from 'utils'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useStore } from 'utils'

export function DiscountList() {
  const router = useRouter()
  const formMethods = useForm()

  const store = useStore((state) => ({
    stocks: state.stocks,
  }))

  const [stocks, setStocks] = useState(store.stocks.filter((_stock: any) => !!_stock.product))

  async function onSubmitDiscountForm(form: any) {
    const stocks = []
    for (let item in form) {
      const [stock, product] = item.split(':')
      delete form[item].priceAfterDiscount
      delete form[item].product
      stocks.push(form[item])
    }
    const response = await pluralEditStock(stocks)
    toast.success('تغییرات اعمال شدند')
    router.reload()
  }

  async function searchCallback(e: any) {
    if (e.target.value.length === 0) {
      setStocks(store.stocks.filter((_stock: any) => !!_stock.product))
    } else {
      function validate(entry: [any, any], target: string): any {
        if (!entry || !entry[1]) return false
        if (typeof entry[1] === "object") {
          return Object.entries(entry[1])
            .some((entries) =>
              validate(entries, target)
            )
        }
        return String(entry[1]).includes(target);
      }

      setStocks(
        store.stocks
          .filter((_item: any) =>
            Object.entries(_item)
              .some((entries) =>
                validate(entries, e.target.value)
              )
          )
      )
    }
  }

  useEffect(() => {
    console.log(stocks)
  }, [stocks])

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmitDiscountForm)}>
        <FlexBox>
          <InputGroup>
            <Button type="submit">ثبت تخفیفات</Button>
            <input placeholder="جستجو" onChange={searchCallback} />
          </InputGroup>
        </FlexBox>
        <Ul>
          {stocks
            .filter((_stock: any) => !!_stock.product)
            .map((_stock: any) => (
              <DiscountListCard key={_stock.id} stock={_stock} />
            ))}
        </Ul>
      </form>
    </FormProvider>
  )
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

const FlexBox = styled.div`
  display: flex;
`
