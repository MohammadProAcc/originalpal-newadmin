import { Calendar, DateObject } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'

interface IPersianDatePickerProps {
  onSelect: (selectedDate: DateObject | DateObject[] | null) => void
  value: DateObject
}
export const PersianDatePicker = (props: IPersianDatePickerProps) => {
  return <Calendar calendar={persian} locale={persian_fa} onChange={props.onSelect} />
}
