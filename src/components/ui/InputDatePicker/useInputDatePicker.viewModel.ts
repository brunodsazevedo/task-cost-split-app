import { useState } from 'react'
import { Platform } from 'react-native'
import { format } from 'date-fns'

interface InputDatePickerViewModelProps {
  value?: Date
  onChangeValue?: (date: Date) => void
}

export function useInputDatePickerViewModel({
  value,
  onChangeValue,
}: InputDatePickerViewModelProps) {
  const [show, setShow] = useState(Platform.OS === 'ios')
  const [date, setDate] = useState(value)

  const dateFormatted = date ? format(date, 'dd/MM/yy') : ''

  function handleDateChange(selectedDate: Date) {
    const localDate = new Date(
      selectedDate.getUTCFullYear(),
      selectedDate.getUTCMonth(),
      selectedDate.getUTCDate(),
    )

    setDate(localDate)
    onChangeValue?.(localDate)
    handleToggleShow()
  }

  function handleToggleShow() {
    if (Platform.OS === 'ios') return

    setShow((prev) => !prev)
  }

  return {
    show,
    date,
    dateFormatted,
    value,
    handleDateChange,
    handleToggleShow,
  }
}
