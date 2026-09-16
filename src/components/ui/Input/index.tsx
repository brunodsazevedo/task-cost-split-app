import { ElementType } from 'react'
import {
  View,
  Pressable,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  Text,
} from 'react-native'
import { SvgProps } from 'react-native-svg'

import { colors } from '@/theme/colors'

import EyeIcon from '@/assets/icons/eye.svg'
import EyeSlashIcon from '@/assets/icons/eye-slash.svg'
import WarningIcon from '@/assets/icons/warning-octagon.svg'

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
  error,
  onBlur,
  onFocus,
  onChangeText,
  className,
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
    secureTextEntry,
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
        className={styles.wrapper({ className })}
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

      {error && (
        <View className="flex-row items-center gap-x-2 mt-3">
          <WarningIcon height={16} width={16} color={colors['danger-light']} />

          <Text className="text-body text-sm text-danger-light">{error}</Text>
        </View>
      )}
    </View>
  )
}
