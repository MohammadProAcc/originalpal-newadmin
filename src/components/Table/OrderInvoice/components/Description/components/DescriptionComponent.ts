import styled from "styled-components";

export const DescriptionComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 315mm;
  height: 297mm;
  margin: 0 auto;
  padding: 1rem;

  @media print {
    @page {
      size: a4;
    }
    width: auto;
    margin: 0;
  }
`;
