import { View, Text, TouchableOpacity } from 'react-native'

import { colors } from '@/theme/colors'

import CloseIcon from '@/assets/icons/x.svg'

type Props = {
  title: string
  onClose?: () => void
}

export function HeaderModal({ title, onClose }: Props) {
  return (
    <View className="flex-row items-center justify-between px-6 pt-6 pb-8">
      <Text className="font-label text-lg text-gray-100">{title}</Text>

      <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
        <CloseIcon height={16} width={16} color={colors.gray['300']} />
      </TouchableOpacity>
    </View>
  )
}
