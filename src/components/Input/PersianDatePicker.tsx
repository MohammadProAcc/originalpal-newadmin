import { Calendar, DateObject } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import { toLocalDate } from 'utils'
import styled, { FlattenSimpleInterpolation } from 'styled-components'
import { ReactNode } from 'react'

interface IPersianDatePickerProps {
  onSelect: (selectedDate: Date) => void
  value: string
  title?: ReactNode
  Style?: FlattenSimpleInterpolation
}
export const PersianDatePicker = (props: IPersianDatePickerProps) => {
  return (
    <$>
      {props.title}
      <Calendar
        calendar={persian}
        locale={persian_fa}
        onChange={(v) => props.onSelect(new Date(v?.valueOf() as any))}
        value={toLocalDate(props.value)}
      />
    </$>
  )
}

interface I$Props {
  Style?: FlattenSimpleInterpolation
}
const $ = styled.div<I$Props>`
  position: relative;
  z-index: 0;

  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  ${(props) => props.Style}
`
