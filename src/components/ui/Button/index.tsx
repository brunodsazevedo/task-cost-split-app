import { ElementType, ReactNode } from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { SvgProps } from 'react-native-svg'

import { colors } from '@/theme/colors'

import { buttonVariants } from './buttonVariants'

interface Props extends TouchableOpacityProps {
  isLoading?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
  leftIcon?: ElementType<SvgProps>
  rightIcon?: ElementType<SvgProps>
  children: ReactNode
}

export function Button({
  variant = 'primary',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  isLoading = false,
  className,
  children,
  ...rest
}: Props) {
  const styles = buttonVariants({
    isDisabled: rest.disabled,
    isLoading,
    variant,
    hasIcon: !!LeftIcon || !!RightIcon,
  })

  const iconColor =
    variant === 'primary'
      ? colors.gray[800]
      : variant === 'secondary'
        ? colors.gray[300]
        : colors['danger-light']

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={rest.disabled || isLoading}
      className={styles.container({ className })}
      {...rest}
    >
      {LeftIcon && <LeftIcon height={24} width={24} color={iconColor} />}

      <Text className={styles.text()}>{children}</Text>

      {RightIcon && <RightIcon height={24} width={24} color={iconColor} />}
    </TouchableOpacity>
  )
}
