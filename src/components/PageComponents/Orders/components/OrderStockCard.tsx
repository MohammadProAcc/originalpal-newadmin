import { Card, Image, Group, Text, Badge, Button, LoadingOverlay, Alert } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { IStockForCreation } from "types";
import { getSingleStock, preppend } from "utils";

export function OrderStockCard(props: IOrderStockCardProps) {
  const { isLoading, error, data } = useQuery(["stock", props.stock.id], () => getSingleStock(props.stock.id));

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder sx={{ position: "relative" }}>
      <LoadingOverlay visible={isLoading} />
      {error && (
        <Alert title="خطا" color="red">
          دریافت مشخصات انبار موفقیت آمیز نبود.
        </Alert>
      )}
      {data && (
        <>
          <Card.Section>
            <Image
              src={preppend(data.product?.site_main_picture.u)}
              height={160}
              alt={`تصویر ${data.product?.name}`}
              sx={{
                objectFit: "cover",
              }}
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>
              {data.product_id} - {data.product?.name}
            </Text>

            <Badge color="blue" variant="light">
              سایز: <strong>{data.size}</strong>
            </Badge>
            <Badge color="grape" variant="light">
              × {props.stock.quantity}
            </Badge>
          </Group>

          <Group position="apart" mt="md" mb="xs">
            <Button
              variant="light"
              color="red"
              fullWidth
              mt="md"
              radius="md"
              onClick={() => props.removeCallback(props.stock.id)}
            >
              حذف
            </Button>
            <Button
              variant="light"
              color="teal"
              fullWidth
              mt="md"
              radius="md"
              onClick={() => props.reductionCallback(props.stock.id)}
            >
              کاهش تعداد (1-)
            </Button>
          </Group>
        </>
      )}
    </Card>
  );
}

interface IOrderStockCardProps {
  stock: IStockForCreation;
  removeCallback: (stockId: number) => void;
  reductionCallback: (stockId: number) => void;
}
