import { useRef, useState } from 'react'
import { BlurEvent, FocusEvent } from 'react-native'
import CurrencyInput from 'react-native-currency-input'

import { colors } from '@/theme/colors'

type Props = {
  value: number | null
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: BlurEvent) => void
  onChangeValue?: (value: number) => string | void
}

export function useInputCurrencyViewModel({
  value,
  onFocus,
  onBlur,
  onChangeValue,
}: Props) {
  const [isFocused, setIsFocused] = useState(false)

  const inputRef = useRef<CurrencyInput>(null)

  function handleWrapperPress() {
    inputRef.current?.focus()
  }

  function handleFocus(event: FocusEvent) {
    setIsFocused(true)
    onFocus?.(event)
  }

  function handleBlur(event: BlurEvent) {
    setIsFocused(false)
    onBlur?.(event)
  }

  function handleChangeText(value: number) {
    onChangeValue?.(value)
  }

  function getIconColor() {
    if (isFocused) {
      return colors.white
    }

    return colors.gray[400]
  }

  return {
    isFocused,
    inputRef,
    value,
    handleWrapperPress,
    handleFocus,
    handleBlur,
    handleChangeText,
    getIconColor,
  }
}
