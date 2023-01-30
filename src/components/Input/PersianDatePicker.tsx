import { useOnClickOutside } from "hooks";
import { ReactNode, useRef } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar } from "react-multi-date-picker";
import styled from "styled-components";
import { toLocalDate } from "utils";

interface IPersianDatePickerProps {
  onSelect: (selectedDate: Date) => void;
  value: string;
  title?: ReactNode;
  zIndex?: number;
  onClickOutSide?: any;
}
export const PersianDatePicker = (props: IPersianDatePickerProps) => {
  const datePickerRef = useRef<any>(null);
  useOnClickOutside(datePickerRef, () => props.onClickOutSide());

  return (
    <$ zIndex={props.zIndex}>
      {props.title}
      <Calendar
        calendar={persian}
        locale={persian_fa}
        onChange={(v) => props.onSelect(new Date(v?.valueOf() as any))}
        value={toLocalDate(props.value)}
        ref={datePickerRef}
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
