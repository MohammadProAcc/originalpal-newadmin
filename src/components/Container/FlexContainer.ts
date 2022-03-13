import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

interface IFlexContainerProps {
  col?: boolean
  jc?: string
  ai?: string
  fullWidth?: boolean
  Style?: FlattenSimpleInterpolation
}

export const FlexContainer = styled.div<IFlexContainerProps>`
  width: ${(props) => props.fullWidth && '100%'};
  display: flex;
  flex-direction: ${(p) => p.col && 'column'};
  justify-content: ${(p) => p.jc};
  align-items: ${(p) => p.ai} ${(p) => p.Style};
`
