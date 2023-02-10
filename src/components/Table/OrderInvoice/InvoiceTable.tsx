import React, { useState } from "react";
import { IOrder } from "types";
import { toLocalDate, toLocalTime } from "utils";
import { v4 } from "uuid";
import {
  Column,
  Date,
  DateContainer,
  Description,
  DescriptionComponent,
  Details,
  H1,
  Header,
  Hint,
  Row,
  Span,
  Strong,
} from "./components";
import { ItemsTable } from "./components/ItemsTable";
import { InvoiceMode } from "./types";

interface IInvoiceTableProps {
  order: IOrder;
  mode?: InvoiceMode;
}

export const InvoiceTable: React.FC<IInvoiceTableProps> = ({ order, mode }) => {
  const [orderItemSlices] = useState(() => {
    const grouped: any = [[]];
    let groupCount = 0;
    order?.order_items?.forEach((item, index, array) => {
      if ((index + 1) % 6 === 0) {
        grouped[++groupCount] = [];
      }
      grouped[groupCount].push(item);
    });
    return grouped;
  });

  const priceArr = order?.order_items?.map((_item) => Number(_item?.price ?? 0) * (_item?.quantity ?? 1));
  const payable = priceArr.reduce((curr, prev) => curr + prev, 0);
  const countArr = order?.order_items?.map((_item) => _item?.quantity);
  const totalCount = countArr?.reduce((_prev, _curr) => Number(_prev) + Number(_curr));

  return (
    <>
      {orderItemSlices.map((orderItems: any, index: number, array: any[]) => (
        <DescriptionComponent key={v4()}>
          <Header>
            <span>
              صفحه <strong>{index + 1}</strong> از <strong>{orderItemSlices.length}</strong>
            </span>
            <H1>
              ORIGINALPAL اوریجینال پَل
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
                <Strong>صورت حساب آقای / خانم :</Strong> {`${order?.user?.name ?? ""}  ${order?.user?.lastname ?? ""}`}
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

          <ItemsTable order={index} items={orderItems} />

          <Description
            order={order}
            payable={payable}
            totalCount={totalCount}
            isLastPage={index === array.length - 1}
          />
        </DescriptionComponent>
      ))}
    </>
  );
};
