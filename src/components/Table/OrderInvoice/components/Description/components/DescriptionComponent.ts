import styled from "styled-components";

export const DescriptionComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 315mm;
  height: 297mm;
  margin: 0 auto;
  padding: 1rem 0.125rem 0.125rem 0.125rem;
  border: 1px solid black;

  @media print {
    @page {
      size: a4;
    }
    width: auto;
    margin: 0;
  }
`;
