import { SendInvoice, Strong } from "components";
import { Column as _Column } from "components/Table/OrderInvoice/components/Details/components/Row/components/Column";
import { FlexContainer as _FlexContainer } from "components/Container/FlexContainer";
import { Row as _Row } from "components/Container/Row";
import styled from "styled-components";
import { Colors } from "styles";
import React, { useEffect } from "react";
import {
  Table as _Table,
  TD as _TD,
  TH as _TH,
  TR,
} from "components/Table/OrderInvoice/components/ItemsTable/components";
import { useRouter } from "next/router";

export const ReturnForm: React.FC = () => {
  const router = useRouter();
  const query = router.query;

  function print() {
    setTimeout(() => {
      window.print();
    }, 500);
  }

  useEffect(() => {
    router.events.on("routeChangeComplete", print);

    return () => {
      router.events.off("routeChangeComplete", print);
    };
  }, []);

  return (
    <SendInvoice
      return={Boolean(query?.isReturn)}
      address={String(query?.address)}
      phone={String(query?.phone)}
      postalcode={String(query?.postalcode)}
      reciever_name={String(query?.reciever_name)}
      tel={String(query?.tel)}
    />
  );
};

export default ReturnForm;
