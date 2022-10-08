import { Modal } from "@paljs/ui";
import { AnswerCommentForm, ModalBox } from "components";
import React, { useState } from "react";
import { Comment } from "types";

export function AnswerCommentFormModal(props: AnswerCommentFormModalProps) {

  return (
    <Modal on={props.show} toggle={props.toggle}>
      <ModalBox style={{minWidth: "70vw"}}>
        {props.comment && <AnswerCommentForm comment={props.comment} />}
      </ModalBox>
    </Modal>
  )
}

interface AnswerCommentFormModalProps {
  comment: Comment;
  show: boolean;
  toggle: () => void;
}
