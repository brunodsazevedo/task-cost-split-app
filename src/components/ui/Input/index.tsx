import { ElementType } from 'react'
import {
  View,
  Pressable,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native'
import { SvgProps } from 'react-native-svg'

import { colors } from '@/theme/colors'

import EyeIcon from '@/assets/icons/eye.svg'
import EyeSlashIcon from '@/assets/icons/eye-slash.svg'

import { useInputViewModel } from './useInputViewModel'
import { inputVariants, InputVariantsProps } from './input.variants'

export interface InputProps extends TextInputProps, InputVariantsProps {
  leftIcon?: ElementType<SvgProps>
  containerClassName?: string
  error?: string
}

export function Input({
  leftIcon,
  value,
  isDisabled = false,
  secureTextEntry = false,
  onBlur,
  onFocus,
  onChangeText,
  ...rest
}: InputProps) {
  const {
    inputRef,
    isFocused,
    showPassword,
    handleWrapperPress,
    handleChangeText,
    handleFocus,
    handleBlur,
    handlePasswordToggle,
    getIconColor,
  } = useInputViewModel({
    value,
    onBlur,
    onFocus,
    onChangeText,
  })

  const styles = inputVariants({
    isFocused,
    isDisabled,
  })

  const LeftIcon = leftIcon

  const RightIcon = secureTextEntry
    ? showPassword
      ? EyeSlashIcon
      : EyeIcon
    : null

  return (
    <View className={styles.container()}>
      <Pressable
        disabled={isDisabled}
        className={styles.wrapper()}
        onPress={handleWrapperPress}
      >
        {LeftIcon && (
          <View className="mr-3">
            <LeftIcon color={getIconColor()} />
          </View>
        )}

        <TextInput
          ref={inputRef}
          value={value}
          editable={!isDisabled}
          placeholderTextColor={colors.gray[400]}
          secureTextEntry={showPassword}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          className={styles.input()}
          {...rest}
        />

        {RightIcon && (
          <TouchableOpacity activeOpacity={0.7} onPress={handlePasswordToggle}>
            <RightIcon color={colors.white} />
          </TouchableOpacity>
        )}
      </Pressable>
    </View>
  )
}
