import { ElementType } from 'react'
import { View, Text, Pressable } from 'react-native'
import { SvgProps } from 'react-native-svg'
import CurrencyInput, { CurrencyInputProps } from 'react-native-currency-input'

import { colors } from '@/theme/colors'

import WarningIcon from '@/assets/icons/warning-octagon.svg'

import { useInputCurrencyViewModel } from './useInputCurrencyViewModel'

import { inputCurrencyVariants } from './inputCurrencyVariants'

export interface InputCurrencyProps extends CurrencyInputProps {
  leftIcon?: ElementType<SvgProps>
  isDisabled?: boolean
  error?: string
}

export function InputCurrency({
  value,
  isDisabled,
  error,
  leftIcon: LeftIcon,
  onChangeValue,
  onFocus,
  onBlur,
  ...rest
}: InputCurrencyProps) {
  const {
    inputRef,
    isFocused,
    handleBlur,
    handleChangeText,
    handleFocus,
    handleWrapperPress,
    getIconColor,
  } = useInputCurrencyViewModel({
    value,
    onChangeValue,
    onFocus,
    onBlur,
  })

  const styles = inputCurrencyVariants({
    isFocused,
    isDisabled,
  })

  return (
    <View className={styles.container()}>
      <Pressable
        disabled={isDisabled}
        className={styles.wrapper()}
        onPress={handleWrapperPress}
      >
        {LeftIcon && (
          <View>
            <LeftIcon color={getIconColor()} />
          </View>
        )}

        <CurrencyInput
          ref={inputRef}
          value={value}
          onChangeValue={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!isDisabled}
          placeholderTextColor={colors.gray[400]}
          className={styles.input()}
          {...rest}
        />
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
