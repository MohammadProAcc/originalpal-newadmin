import { Divider, Flex, LoadingOverlay } from "@mantine/core";
import { OrderDetailCard } from "components";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { OrderItem } from "types";
import { getSingleOrder } from "utils";

export const OrderDetails: React.FC<{ orderId: number }> = ({ orderId }) => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    getSingleOrder(orderId.toString(), Cookies.get(process.env.TOKEN!) ?? "").then(({ data }) => {
      setOrder(data);
      setLoading(false);
    });
  }, []);

  const [tableSelections, setTableSelections] = useState<number[] | []>([]);
  const clearSelectionsRef = useRef<any>();

  const columns = ["شناسه انبار", "شناسه محصول", "تعداد", "سایز"];

  return (
    <$>
      <Flex className="container" direction="column">
        <LoadingOverlay visible={loading} />
        {order?.order_items?.map((item: OrderItem, index: number, array: any[]) => (
          <>
            <OrderDetailCard orderItem={item} />
            {index < array.length - 1 && <Divider my="xs" variant="dashed" />}
          </>
        ))}
      </Flex>
    </$>
  );
};

const $ = styled.div`
  .container {
    min-width: 10rem;
    min-height: 4rem;

    position: relative;
  }
`;
