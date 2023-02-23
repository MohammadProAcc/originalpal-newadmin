import { useGetImage } from "hooks";
import { createRef } from "react";
import styled from "styled-components";

export default function Page() {
  const ref = createRef<any>();
  const getImage = useGetImage(ref);
  return (
    <$ ref={ref}>
      Sandbox
      <button onClick={getImage}>take screenshot</button>
    </$>
  );
}

const $ = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: blue;

  @media print {
    @page {
      size: A5;
    }
  }
`;
