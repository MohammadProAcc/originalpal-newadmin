import { Divider, Flex, Group, Space, Text } from "@mantine/core";
import { MutableRefObject } from "react";
import styled from "styled-components";

interface ISendInvoiceProps {
  reciever_name: string;
  address: string;
  postalcode: string;
  tel: string;
  phone: string;
  return?: boolean;
  forwardingRef: MutableRefObject<any>;
}
export function SendInvoice(props: ISendInvoiceProps) {
  return (
    <$ ref={props.forwardingRef}>
      <Section {...props} />
      <Divider variant="dashed" my="xl" color="dark" />
      <Section {...props} />
    </$>
  );
}

const $ = styled.div`
  width: 148mm;
  height: 210mm;
  padding: 1rem;

  * {
    text-align: right;
  }

  /* TODO: implement a proper method */
  @page {
    size: 210mm 148mm;
  }

  transform: translateX(-40%) rotate(90deg);
  @media print {
    @page {
      size: a5 landscape;
      margin: 0mm !important;
    }
    @media all {
      .pagebreak {
        overflow: visible;
      }
    }
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
    <div>
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
    </div>

    <div>
      <Divider variant="dashed" my="sm" color="dark" />

      <Flex direction="column" gap="md">
        <Text fw="bolder" className="thin">
          {props.return ? "گیرنده" : "فرستنده"}: همدان - اورجینال پَل
        </Text>
        <Text fw="bolder" className="thin">
          آدرس صندوق پستی: 1519 _ 65155
        </Text>
        <Text fw="bolder" className="thin">
          تلفن {props.return ? "گیرنده" : "فرستنده"}: 38263633 081 - 38283237 081
        </Text>
        <Text fw="bolder" className="thin">
          موبایل: 09120387302
        </Text>
      </Flex>
    </div>
  </$_Section>
);

const $_Section = styled.div`
  height: 84mm;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  font-size: 1.25rem;
  .thin {
    font-size: 1rem;
  }
`;
