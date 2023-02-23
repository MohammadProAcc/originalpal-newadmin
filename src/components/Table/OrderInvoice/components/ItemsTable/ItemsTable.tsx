import React, { useEffect, useState } from "react";
import { numeralize } from "utils";
import { ProductImage, Table, TD, TH, TR } from "./components";
import { ItemsTableProps } from "./types";

export const ItemsTable: React.FC<ItemsTableProps> = ({ order, items }) => {
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discounted, setDiscounted] = useState(false);

  useEffect(() => {
    // NOTE: total items calculation
    const priceArr = items?.map((_item) => Number(_item?.price ?? 0) * (_item?.quantity ?? 1));
    priceArr?.length > 0 && setTotalPrice(priceArr?.reduce((_prev, _curr) => _prev + _curr));

    // NOTE: total price calculation
    const countArr = items?.map((_item) => _item?.quantity);
    countArr?.length > 0 && setTotalItems(countArr?.reduce((_prev, _curr) => Number(_prev) + Number(_curr)));

    // NOTE: discounted evaluation
  }, []);

  return (
    <Table>
      <TR>
        <TH className="index-row">ردیف</TH>
        <TH>کد محصول</TH>
        <TH>نام محصول</TH>
        <TH>تعداد</TH>
        <TH>سایز</TH>
        <TH>مبلغ واحد</TH>
        <TH>مبلغ کل</TH>
        {discounted && <TH>تخفیف</TH>}
        <TH>تصویر کالا</TH>
      </TR>
      {items?.map((_item, index) => (
        <TR>
          <TD>{index + order * 5 + 1}</TD>
          <TD>{_item?.product?.code}</TD>
          <TD>{_item?.product?.name}</TD>
          <TD>{_item?.quantity}</TD>
          <TD>{_item?.size}</TD>
          <TD>{numeralize(_item?.price)}</TD>
          <TD>{numeralize((Number(_item.price) ?? 0) * (_item?.quantity ?? 1))}</TD>
          {discounted && <TD>{numeralize(Number(_item?.price))}</TD>}
          <TD>
            <ProductImage src={`${process.env.SRC}/${_item?.product?.site_main_picture?.u}`} />
          </TD>
        </TR>
      ))}
      <TR>
        <TD>جمع کل فاکتور</TD>
        <TD />
        <TD />
        <TD>{totalItems}</TD>
        <TD />
        <TD>{numeralize(totalPrice)}</TD>
      </TR>
    </Table>
  );
};
