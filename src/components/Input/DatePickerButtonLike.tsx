import { Button, Text } from "@mantine/core";
import { useState } from "react";
import styled from "styled-components";
import { ZIndex } from "styles";
import { toLocalDate } from "utils";
import { PersianDatePicker } from "./PersianDatePicker";

interface IDatePickerButtonLikeProps {
  value: string;
  onChange: (date: Date) => void;
}
export function DatePickerButtonLike(props: IDatePickerButtonLikeProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  function toggleCalendar() {
    setShowCalendar((s) => !s);
  }

  return (
    <$>
      <Button
        variant="light"
        color="cyan"
        onClick={toggleCalendar}
        styles={{
          root: {
            width: "8rem",
          },
          label: {
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          },
        }}
      >
        <img src="/pngs/calendar.png" width="24" height="24" />
        <Text>{toLocalDate(props.value ?? "") ?? "- / - / -"}</Text>
      </Button>

      <CalendarContainer data-active={showCalendar}>
        <PersianDatePicker
          onClickOutSide={() => setShowCalendar(false)}
          value={props.value ?? ""}
          onSelect={props.onChange}
          zIndex={+ZIndex.max - 1}
        />
      </CalendarContainer>
    </$>
  );
}

const $ = styled.div`
  position: relative;
`;

const CalendarContainer = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;

  &[data-active="false"] {
    visibility: hidden;
    opacity: 0;
  }
`;
