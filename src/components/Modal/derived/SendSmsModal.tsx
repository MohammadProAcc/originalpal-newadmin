import { Modal, ModalProps } from "@mantine/core";
import { SendSmsForm } from "components";

export function SendSmsModal(props: ModalProps) {
  return (
    <Modal opened={props.opened} onClose={props.onClose}>
      <SendSmsForm />
    </Modal>
  );
}
