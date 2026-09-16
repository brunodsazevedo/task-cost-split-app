import { ElementType } from 'react'
import { Pressable, Text, View } from 'react-native'
import { SvgProps } from 'react-native-svg'
import DateTimePicker from '@expo/ui/community/datetime-picker'

import { Input } from '@/components/ui/Input'

import { colors } from '@/theme/colors'

import { useInputDatePickerViewModel } from './useInputDatePicker.viewModel'

import WarningIcon from '@/assets/icons/warning-octagon.svg'

export interface InputDatePickerProps {
  leftIcon?: ElementType<SvgProps>
  placeholder?: string
  isDisabled?: boolean
  error?: string
  value?: Date
  onChangeValue?: (date: Date) => void
}

export function InputDatePicker({
  leftIcon,
  placeholder,
  isDisabled = false,
  value,
  error,
  onChangeValue,
}: InputDatePickerProps) {
  const { dateFormatted, date, show, handleToggleShow, handleDateChange } =
    useInputDatePickerViewModel({
      value,
      onChangeValue,
    })

  return (
    <View className="">
      <Pressable disabled={isDisabled} onPress={handleToggleShow}>
        <Input
          value={dateFormatted}
          leftIcon={leftIcon}
          isDisabled
          placeholder={placeholder}
          className={!isDisabled ? 'opacity-100' : ''}
        />
      </Pressable>

      {error && (
        <View className="flex-row items-center gap-x-2 mt-3">
          <WarningIcon height={16} width={16} color={colors['danger-light']} />

          <Text className="text-body text-sm text-danger-light">{error}</Text>
        </View>
      )}

      {show && (
        <DateTimePicker
          value={date ?? new Date()}
          onValueChange={(_, selectedDate) => handleDateChange(selectedDate)}
          onDismiss={handleToggleShow}
          mode="date"
          display="spinner"
          presentation="dialog"
        />
      )}
    </View>
  )
}
