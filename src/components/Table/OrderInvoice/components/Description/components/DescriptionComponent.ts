import styled from "styled-components";

export const DescriptionComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 315mm;
  height: 297mm;
  margin: 0 auto;

  @media print {
    width: auto;
    margin: 0;
  }
`;
