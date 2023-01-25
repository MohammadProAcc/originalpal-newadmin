import { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { toLocalDate } from "utils";
import styled, { FlattenSimpleInterpolation } from "styled-components";
import { ReactNode } from "react";

interface IPersianDatePickerProps {
  onSelect: (selectedDate: Date) => void;
  value: string;
  title?: ReactNode;
  zIndex?: number;
}
export const PersianDatePicker = (props: IPersianDatePickerProps) => {
  return (
    <$ zIndex={props.zIndex}>
      {props.title}
      <Calendar
        calendar={persian}
        locale={persian_fa}
        onChange={(v) => props.onSelect(new Date(v?.valueOf() as any))}
        value={toLocalDate(props.value)}
      />
    </$>
  );
};

interface I$Props {
  zIndex?: number;
}
const $ = styled.div<I$Props>`
  position: relative;
  z-index: ${(props) => props.zIndex ?? 0};

  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
