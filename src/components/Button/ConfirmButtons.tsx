import { Button, Flex } from "@mantine/core";
import { ReactNode } from "react";

interface IConfirmButtonsProps {
  confirm: {
    title?: ReactNode;
    callback: any;
  };
  cancel: {
    title?: ReactNode;
    callback: any;
  };
}
export function ConfirmButtons(props: IConfirmButtonsProps) {
  return (
    <Flex gap="md">
      <Button variant="light" color="red" onClick={props.cancel.callback}>
        {props.cancel.title ?? "خیر"}
      </Button>
      <Button variant="light" color="cyan" onClick={props.confirm.callback}>
        {props.confirm.title ?? "بله"}
      </Button>
    </Flex>
  );
}
