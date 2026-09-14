import { useRef, useState } from 'react'
import { BlurEvent, FocusEvent, TextInput } from 'react-native'

import { colors } from '@/theme/colors'

type InputViewModelProps = {
  value?: string
  secureTextEntry?: boolean
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: BlurEvent) => void
  onChangeText?: (text: string) => string | void
}

export function useInputViewModel({
  secureTextEntry,
  value,
  onFocus,
  onBlur,
  onChangeText,
}: InputViewModelProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(secureTextEntry)

  const inputRef = useRef<TextInput>(null)

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

  function handlePasswordToggle() {
    setShowPassword((prev) => !prev)
  }

  function handleChangeText(text: string) {
    onChangeText?.(text)
  }

  function getIconColor() {
    if (isFocused) {
      return colors.white
    }

    return colors.gray[400]
  }

  return {
    inputRef,
    isFocused,
    showPassword,
    value,
    handleFocus,
    handleBlur,
    handleChangeText,
    handlePasswordToggle,
    handleWrapperPress,
    getIconColor,
  }
}
