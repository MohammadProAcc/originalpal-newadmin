import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const PDFViewer: any = dynamic(async () => {
  const mod = await import("@react-pdf/renderer");
  return mod.PDFViewer;
}, {
  ssr: false,
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
export const MyDocument = (props: any) => {
  const [itemPerPage] = useState(10);
  const [totalPages] = useState(Math.floor(props.result.length / itemPerPage));

  const pages = useRef<any[]>([]);

  useEffect(() => {
    props.result.forEach((element: any, index: number) => {
      const $index = index === 0 ? 1 : index;
      const pageToWrite = totalPages - Math.floor(
        ($index + 10) / 10,
      );
      pages.current[pageToWrite]
        ? pages.current[pageToWrite].push(element)
        : pages.current[pageToWrite] = [element];
    });
    console.log(pages);
  }, []);

  // TODO: complete the pdf rendering mechanism
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>بخش #۱</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
};

export const Renderer = (props: any) => {
  return (
    <Styler>
      <PDFViewer>
        {props.children}
      </PDFViewer>
    </Styler>
  );
};

const Styler = styled.div`
  iframe {
    width: 100%;
    min-height: 25rem;
  }
`;
