import { View, Text, TouchableOpacity } from 'react-native'

import { Divider } from '@/components/ui/Divider'

import CalendarIcon from '@/assets/icons/blank-calendar.svg'
import UserGroupIcon from '@/assets/icons/user-multiple-group.svg'
import DollarCoinIcon from '@/assets/icons/dollar-coin.svg'

import { colors } from '@/theme/colors'

import { useActivityItemViewModel } from './useActivityItem.viewModel'

type Props = ReturnType<typeof useActivityItemViewModel>

export function ActivityItemView({
  activityData,
  dateFormatted,
  totalAmountFormatted,
  onActivityPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="w-full p-4 rounded-xl border gap-y-3 border-gray-600 bg-gray-700"
      onPress={onActivityPress}
    >
      <View className="flex-row items-center justify-between">
        <Text className="font-label text-base text-gray-100">
          {activityData.name}
        </Text>

        <Text className="font-label text-sm text-gray-100">
          {totalAmountFormatted}
        </Text>
      </View>

      <View>
        <Divider />

        <View className="flex-row items-center justify-between pt-4">
          <View className="flex-row items-center gap-x-2">
            <CalendarIcon height={16} width={16} color={colors.gray[400]} />

            <Text className="font-label text-sm text-gray-400">
              {dateFormatted}
            </Text>
          </View>

          <View className="flex-row items-center gap-x-2">
            <UserGroupIcon height={16} width={16} color={colors.gray[400]} />

            <Text className="font-label text-sm text-gray-400">
              {activityData.participants.length} pessoas
            </Text>
          </View>

          <View className="flex-row items-center gap-x-2">
            <DollarCoinIcon height={16} width={16} color={colors.gray[400]} />

            <Text className="font-label text-sm text-gray-400">
              {activityData.expensesAmount} despesas
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
