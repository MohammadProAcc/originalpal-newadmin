import { Divider, Text } from "@mantine/core";
import { MutableRefObject } from "react";
import styled from "styled-components";

interface ISendAndReturnInvoiceSectionProps {
  details: {
    reciever_name: string;
    address: string;
    postalcode: string;
    tel: string;
    phone: string;
    vendorName?: string;
    vendorAddress?: string;
    vendorPhone?: string;
  };
  return?: boolean;
  forwardingRef: MutableRefObject<any>;
}
export function SendAndReturnInvoiceSection(props: ISendAndReturnInvoiceSectionProps) {
  return (
    <$>
      <Primary>
        <p>
          {props.return ? "فرستنده" : "گیرنده"}:{" "}
          {props.details.reciever_name?.length > 0 ? props.details.reciever_name : "-"}
        </p>

        <p>آدرس: {props.details.address?.length > 0 ? props.details.address : "-"}</p>
        <p className="inline">
          <span>کد پستی: {props.details.postalcode?.length > 0 ? props.details.postalcode : "-"}</span>

          <span>موبایل: {props.details.phone?.length > 0 ? props.details.phone : "-"}</span>

          <span>تلفن: {props.details.tel?.length > 0 ? props.details.tel : "-"}</span>
        </p>
      </Primary>

      <Secondary>
        <Divider variant="dotted" size="lg" mt="4rem" mb="1rem" />
        <p className="light">
          {props.return ? "گیرنده" : "فرستنده"}: {props.details.vendorName}
        </p>
        <p className="light">آدرس صندوق پستی: {props.details.vendorAddress}</p>
        <p className="light">
          تلفن {props.return ? "گیرنده" : "فرستنده"}: {props.details.vendorPhone}
        </p>
      </Secondary>
    </$>
  );
}

const $ = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Primary = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .inline {
    display: inline-flex;
    gap: 1rem;
  }
`;

const Secondary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
