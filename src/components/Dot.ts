import styled from 'styled-components';

export const Dot = styled.div<{ color: string }>`
  min-width: 1rem;
  max-width: 1rem;

  min-height: 1rem;
  max-height: 1rem;

  border-radius: 50%;

  display: inline-flex;

  background-color: ${(props) => props.color};
`;
