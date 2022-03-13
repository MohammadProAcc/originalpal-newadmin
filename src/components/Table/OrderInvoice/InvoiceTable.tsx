import { OrderInvoiceDetails } from 'components/PageComponents/Orders/types'
import React from 'react'
import { IOrder } from 'types'
import { toLocalDate, toLocalTime } from 'utils'
import {
  Column,
  DescriptionComponent,
  Date,
  DateContainer,
  Details,
  H1,
  Header,
  Hint,
  Row,
  Span,
  Strong,
  Description,
} from './components'
import { ItemsTable } from './components/ItemsTable'
import { InvoiceMode } from './types'

interface IInvoiceTableProps {
  order: IOrder
  mode?: InvoiceMode
}

export const InvoiceTable: React.FC<IInvoiceTableProps> = ({ order, mode }) => {
  return (
    <DescriptionComponent>
      <Header>
        <H1>
          Original Pal اوریجینال پَل
          <Span>فاکتور فروش</Span>
        </H1>

        <DateContainer>
          <Date>تاریخ : {toLocalDate(order?.created_at)}</Date>

          <Date>ساعت : {toLocalTime(order?.created_at)}</Date>
        </DateContainer>
      </Header>

      <Details>
        <Row>
          <Column>
            <Strong>صورت حساب آقای / خانم :</Strong> {`${order?.user?.name ?? ''}  ${order?.user?.lastname ?? ''}`}
          </Column>

          <Column>
            <Strong>کد سفارش : </Strong> {order?.id}
          </Column>
        </Row>

        <Row>
          <Column>
            <Strong>تلفن : </Strong> {order?.user?.phone}
          </Column>

          <Column>
            <Strong>کد پستی : </Strong> {order?.address?.postalcode}
          </Column>
        </Row>

        <Row>
          <Column>
            <Strong>آدرس : </Strong> {order?.address.address}
          </Column>
        </Row>
      </Details>

      <Hint>( مبالغ به تومان میباشند )</Hint>

      <ItemsTable items={order?.order_items} />

      <Description order={order} />
    </DescriptionComponent>
  )
}
