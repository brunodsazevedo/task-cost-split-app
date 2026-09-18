import { View, Text, TouchableOpacity } from 'react-native'

import { Divider } from '@/components/ui/Divider'

import { useExpenseItemViewModel } from './useExpenseItem.viewModel'

type Props = ReturnType<typeof useExpenseItemViewModel>

export function ExpenseItemView({ expenseData }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="w-full rounded-xl p-4 gap-y-3 border border-gray-600 bg-gray-700"
    >
      <View className="flex-row items-start justify-between">
        <Text className="font-label text-base leading-normal text-gray-100">
          {expenseData.name}
        </Text>

        <View className="items-end">
          <Text className="font-label text-sm leading-normal text-gray-200">
            R$ 2000
          </Text>

          <Text className="font-body text-xs text-gray-300">
            R$ 1.100 / pessoa
          </Text>
        </View>
      </View>

      <Divider />
    </TouchableOpacity>
  )
}
