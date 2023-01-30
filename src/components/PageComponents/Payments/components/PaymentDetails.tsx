import { BasicTable } from "components";
import { useEffect, useRef, useState } from "react";

export const PaymentDetails: React.FC<{ orderId: number }> = ({ orderId }) => {
  const [order, setPayment] = useState<any>(null);
  const [orderItems, setPaymentItems] = useState<any>([]);

  useEffect(() => {
    setPaymentItems(order?.order_items?.map((item: any) => [item?.id, item?.product_id, item?.quantity, item?.size]));
  }, [order]);

  const [tableSelections, setTableSelections] = useState<number[] | []>([]);
  const clearSelectionsRef = useRef<any>();

  const columns = ["شناسه انبار", "شناسه محصول", "تعداد", "سایز"];

  return (
    <BasicTable
      getSelections={setTableSelections}
      columns={columns}
      rows={orderItems ?? []}
      clearSelectionTriggerRef={clearSelectionsRef}
    />
  );
};
