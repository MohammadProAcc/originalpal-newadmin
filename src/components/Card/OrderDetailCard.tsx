import { Avatar, Flex, Group, LoadingOverlay, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { MOCK_PRODUCT, OrderItem, Product } from "types";
import { getSingleProduct, preppend } from "utils";

interface IOrderDetailCardProps {
  orderItem: OrderItem;
}
export function OrderDetailCard(props: IOrderDetailCardProps) {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    getSingleProduct(props.orderItem.product_id)
      .then((res) => {
        if (res) setProduct(res.data?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <$>
      <Group>
        <Text>
          شناسه محصول : <strong>{props.orderItem.product_id}</strong>
        </Text>

        <Text>
          شناسه انبار : <strong>{props.orderItem.stock_id}</strong>
        </Text>

        <Text>
          سایز : <strong>{props.orderItem.size}</strong>
        </Text>

        <Flex pos="relative" className="product-container">
          <LoadingOverlay visible={loading} />
          {product && (
            <Text>
              <Avatar src={preppend(product?.site_main_picture?.u)} size="lg" />
              کد محصول : <strong>{product?.code}</strong>
            </Text>
          )}
        </Flex>
      </Group>{" "}
    </$>
  );
}

const $ = styled.div`
  width: 100%;
  padding: 0.5rem;

  display: flex;
  flex-direction: column;

  .product-container {
    min-width: 1rem;
    min-height: 1rem;
    padding: 0.5rem;
  }
`;
