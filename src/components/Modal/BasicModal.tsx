import styled, { FlattenSimpleInterpolation } from 'styled-components'
import { ZIndex } from 'styles'
import { Activable, Styleable, Modal } from 'types'

interface IBasicModalProps extends Modal {
  contentStyles?: FlattenSimpleInterpolation
}
export const BasicModal: React.FC<IBasicModalProps> = ({ on, toggle, contentStyles, children }) => {
  return (
    <ModalComponent active={on}>
      <ModalBackdrop onClick={() => toggle()} />
      <ModalContent Style={contentStyles}>{children}</ModalContent>
    </ModalComponent>
  )
}

const ModalComponent = styled.div<Activable>`
  width: 100vw;
  height: 100vh;

  display: ${(props) => (props.active ? 'flex' : 'none')};

  position: fixed;
  top: 0;
  left: 0;

  justify-content: center;
  align-items: center;

  z-index: ${ZIndex.modal};
`

const ModalBackdrop = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);

  z-index: ${ZIndex.modalBackdrop};

  &:hover {
    cursor: pointer;
  }
`

const ModalContent = styled.div<Styleable>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: ${ZIndex.modalContent};

  ${(p) => p.Style}
`
