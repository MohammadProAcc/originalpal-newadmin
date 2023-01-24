import { Calendar, DateObject } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import { toLocalDate } from 'utils'
import styled from 'styled-components'
import { ReactNode } from 'react'

interface IPersianDatePickerProps {
  onSelect: (selectedDate: DateObject | DateObject[] | null) => void
  value: string
  title?: ReactNode
}
export const PersianDatePicker = (props: IPersianDatePickerProps) => {
  return (
    <$>
      {props.title}
      <Calendar calendar={persian} locale={persian_fa} onChange={props.onSelect} value={toLocalDate(props.value)} />
    </$>
  )
}

const $ = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`
