import { InputGroup } from "@paljs/ui";
import styled from "styled-components";

export const AnswerCommentInputGroup = styled(InputGroup)`
  margin-top: 1rem;

  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;

  label {
    width: 100%;
    margin: 0;

    display: flex;
    flex-direction: column;
    justify-content: stretch;
    row-gap: 0.5rem;
  }

  input,
  textarea {
    max-width: none;
  }

  textarea {
    height: 10rem;
  }
`
