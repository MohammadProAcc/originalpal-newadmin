import { InputGroup as _InputGroup } from '@paljs/ui'
import styled from 'styled-components'
import { InputGroupProps } from './styles'

export const InputGroup = styled(_InputGroup)<InputGroupProps>`
  display: flex;
  flex-direction: ${(props) => props.col && 'column'};
`
