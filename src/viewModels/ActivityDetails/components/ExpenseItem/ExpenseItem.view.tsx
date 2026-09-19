import { View, Text, TouchableOpacity, Image } from 'react-native'

import { Divider } from '@/components/ui/Divider'

import { useExpenseItemViewModel } from './useExpenseItem.viewModel'

type Props = ReturnType<typeof useExpenseItemViewModel>

export function ExpenseItemView({
  expenseData,
  expenseAmountFormatted,
  expenseValuePerPersonFormatted,
  participantsAvatarUrls,
  paymentStatus,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="w-full rounded-2xl p-4 gap-y-4 border border-gray-600 bg-gray-700"
    >
      <View className="flex-row items-start justify-between">
        <Text className="font-label text-base leading-normal text-gray-100">
          {expenseData.name}
        </Text>

        <View className="items-end">
          <Text className="font-label text-sm leading-normal text-gray-200">
            {expenseAmountFormatted}
          </Text>

          <Text className="font-body text-xs text-gray-300">
            {expenseValuePerPersonFormatted} / pessoa
          </Text>
        </View>
      </View>

      <Divider />

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          {participantsAvatarUrls?.map((url, index) => (
            <Image
              key={index}
              alt={`Avatar do participante ${index}`}
              source={{ uri: url.avatarUrl }}
              className="h-7 w-7 -mr-1.5 rounded-full border border-gray-700"
            />
          ))}
        </View>

        <View
          className="items-center justify-center px-2 py-1 rounded-lg"
          style={{ backgroundColor: paymentStatus.backgroundColor }}
        >
          <Text
            className="font-label text-sm text-center leading-normal"
            style={{ color: paymentStatus.textColor }}
          >
            {paymentStatus.textLabel}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
