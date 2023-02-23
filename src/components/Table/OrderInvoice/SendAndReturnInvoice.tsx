import { Divider } from "@mantine/core";
import { MutableRefObject } from "react";
import styled from "styled-components";
import { SendAndReturnInvoiceSection } from "./SendAndReturnInvoiceSection";

interface ISendInvoiceProps {
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
export function SendAndReturnInvoice(props: ISendInvoiceProps) {
  return (
    <$ ref={props.forwardingRef}>
      <SendAndReturnInvoiceSection {...props} />
      <Divider variant="dotted" size="lg" my="1rem" />
      <SendAndReturnInvoiceSection {...props} />
    </$>
  );
}

const $ = styled.div`
  width: 148mm;
  min-height: 210mm;
  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  * {
    font-size: 1.25rem;
    font-weight: 900;

    .light {
      font-size: 1.125rem;
    }
  }

  @media print {
    width: 165mm;
    height: 100%;
    transform: rotate(90deg) translateY(3rem);
    @page {
      size: A5 landscape;
      margin: 0mm !important;
    }
    @media all {
      .pagebreak {
        overflow: visible;
      }
    }
  }
`;
