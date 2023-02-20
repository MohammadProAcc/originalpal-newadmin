import { Divider, Flex, Space, Text } from "@mantine/core";
import styled from "styled-components";

interface ISendInvoiceProps {
  reciever_name: string;
  address: string;
  postalcode: string;
  tel: string;
  phone: string;
  return?: boolean;
}
export function SendInvoice(props: ISendInvoiceProps) {
  return (
    <$>
      <Section {...props} />
      <Divider variant="dashed" my="sm" color="dark" />
      <Section {...props} />
    </$>
  );
}

const $ = styled.div`
  width: 148mm;
  height: 210mm;

  * {
    text-align: right;
  }
`;

interface ISectionProps {
  reciever_name: string;
  address: string;
  postalcode: string;
  tel: string;
  phone: string;
  return?: boolean;
}
const Section = (props: ISectionProps) => (
  <$_Section>
    <Text fw="bolder">
      {props.return ? "فرستنده" : "گیرنده"}: {props.reciever_name?.length > 0 ? props.reciever_name : "-"}
    </Text>
    <Space my="md" />

    <Text fw="bolder">آدرس: {props.address?.length > 0 ? props.address : "-"}</Text>
    <Space my="md" />

    <Flex gap="md">
      <Text fw="bolder">کد پستی: {props.postalcode?.length > 0 ? props.postalcode : "-"}</Text>

      <Text fw="bolder">موبایل: {props.phone?.length > 0 ? props.phone : "-"}</Text>

      <Text fw="bolder">تلفن: {props.tel?.length > 0 ? props.tel : "-"}</Text>
    </Flex>

    <Divider variant="dashed" mt="xl" mb="md" />

    <Flex direction="column" gap="md">
      <Text>{props.return ? "گیرنده" : "فرستنده"}: همدان - اورجینال پَل</Text>
      <Text>آدرس صندوق پستی: 65155-1519</Text>
      <Text>تلفن {props.return ? "گیرنده" : "فرستنده"}: 081 38263633 - 021 26322348</Text>
      <Text>موبایل: 09120387302</Text>
    </Flex>
  </$_Section>
);

const $_Section = styled.div``;
