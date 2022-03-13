import { OrderDetailsForm } from 'components/Form'
import { BasicModal } from 'components/Modal/BasicModal'
import React from 'react'
import { ModalBox } from './components'
import { WriteOrderDetailsProps } from './types'

export const WriteOrderDetailsModal: React.FC<WriteOrderDetailsProps> = ({ on, toggle }) => {
  return (
    <BasicModal on={on} toggle={toggle}>
      <ModalBox>
        <OrderDetailsForm close={toggle} />
      </ModalBox>
    </BasicModal>
  )
}
