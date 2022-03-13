import styled from 'styled-components'
import { ColumnProps } from '../types'

export const Column = styled.div<ColumnProps>`
  width: ${(props) => props.fullWidth && '100%'};
  margin-left: 3rem;

  display: flex;
`
