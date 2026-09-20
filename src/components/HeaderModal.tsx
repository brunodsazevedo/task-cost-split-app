import { View, Text, TouchableOpacity } from 'react-native'

import { colors } from '@/theme/colors'

import CloseIcon from '@/assets/icons/x.svg'

type Props = {
  title: string
  subtitle?: string
  onClose?: () => void
}

export function HeaderModal({ title, subtitle, onClose }: Props) {
  return (
    <View className="flex-row items-start justify-between px-6 pt-6 pb-8">
      <View className="gap-y-1">
        <Text className="font-label text-lg leading-normal text-gray-100">
          {title}
        </Text>

        {subtitle && (
          <Text className="font-label text-base leading-normal text-green-base">
            {subtitle}
          </Text>
        )}
      </View>

      <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
        <CloseIcon height={16} width={16} color={colors.gray['300']} />
      </TouchableOpacity>
    </View>
  )
}
