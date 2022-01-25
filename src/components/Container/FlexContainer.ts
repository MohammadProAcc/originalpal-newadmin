import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

interface IFlexContainerProps {
  col?: boolean
  jc?: string
  ai?: string
  Style?: FlattenSimpleInterpolation
}

export const FlexContainer = styled.div<IFlexContainerProps>`
  display: flex;
  flex-direction: ${(p) => p.col && 'column'};
  justify-content: ${(p) => p.jc};
  align-item: ${(p) => p.ai} ${(p) => p.Style};
`
