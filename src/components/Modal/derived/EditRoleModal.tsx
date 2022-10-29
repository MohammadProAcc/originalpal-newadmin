import { Modal as _Modal, ModalProps } from "@mantine/core";
import { RoleForm } from "components";
import React from "react";
import styled from "styled-components";

interface EditRoleModalProps extends ModalProps {
  defaultValues: any;
  callback?: any;
}

export function EditRoleModal(props: EditRoleModalProps) {
  const { defaultValues, callback, ...modalProps } = props;
  return (
    <Modal {...modalProps}>
      <RoleForm defaultValues={defaultValues} callback={callback} />
    </Modal>
  )
}

const Modal = styled(_Modal)`
  .mantine-Modal-inner {
    direction: rtl;

    display: flex;
    justify-content: center;
    align-items: center;

    .mantine-Modal-modal {
      width: 60vw;
      height: 60vh;

      overflow: scroll;
    }
  }
`
