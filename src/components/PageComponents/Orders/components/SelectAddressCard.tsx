import { Card, Text, Button, Divider } from "@mantine/core";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { Address } from "types";

interface ISelectAddressCardProps {
  address: Address;
  selectionCallback: (addr: Address | { address_id: number }) => void;
  active: boolean;
}
export function SelectAddressCard(props: ISelectAddressCardProps) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder sx={{ width: "24rem" }}>
      <Text>
        <strong>استان: </strong>
        {props.address.province}
      </Text>
      <Divider my="xs" />

      <Text>
        <strong>شهر: </strong>
        {props.address.city}
      </Text>
      <Divider my="xs" variant="dashed" />

      <Text size="sm">
        <strong>نشانی: </strong>
        {props.address.address}
      </Text>
      <Divider my="xs" variant="dashed" />

      <Text size="sm">
        <strong>کد پستی: </strong>
        {props.address.postalcode}
      </Text>
      <Divider my="xs" variant="dashed" />

      <Button
        variant={props.active ? "light" : "outline"}
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        disabled={!props.active}
        onClick={() =>
          props.selectionCallback({
            address_id: props.address.id,
          })
        }
      >
        {props.active ? "انتخاب نشانی" : <FaCheck />}
      </Button>
    </Card>
  );
}
