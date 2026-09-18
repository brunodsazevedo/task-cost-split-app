import { ElementType } from 'react'
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import { SvgProps } from 'react-native-svg'

import { colors } from '@/theme/colors'

import {
  iconButtonVariants,
  IconButtonVariantsProps,
} from './iconButtonVariants'

interface Props extends TouchableOpacityProps, IconButtonVariantsProps {
  variant?: 'primary' | 'secondary' | 'danger'
  icon: ElementType<SvgProps>
  isDisabled?: boolean
  isLoading?: boolean
}

export function IconButton({
  variant = 'primary',
  icon: Icon,
  isDisabled,
  isLoading,
  className,
  ...rest
}: Props) {
  const styles = iconButtonVariants({
    variant,
    isDisabled,
    isLoading,
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
      className={styles.container({ className })}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={iconColor} />
      ) : (
        <Icon height={20} width={20} color={iconColor} />
      )}
    </TouchableOpacity>
  )
}
