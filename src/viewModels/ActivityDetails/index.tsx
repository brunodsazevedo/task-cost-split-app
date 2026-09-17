import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'

import { colors } from '@/theme/colors'

import CalendarIcon from '@/assets/icons/blank-calendar.svg'
import ArrowIcon from '@/assets/icons/arrow-left.svg'
import PencilIcon from '@/assets/icons/pencil.svg'
import PieChartIcon from '@/assets/icons/pie-chart.svg'
import AddIcon from '@/assets/icons/add.svg'

import { useActivityDetailsViewModel } from './useActivityDetails.viewModel'
import { ExpenseItem } from './components/ExpenseItem'

type Props = ReturnType<typeof useActivityDetailsViewModel>

export function ActivityDetailsView({
  activityDetailsData,
  dateFormatted,
  isLoading,
  handleRefetch,
  handleBack,
}: Props) {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-base">
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors['green-base']} />
        </View>
      ) : (
        <FlatList
          data={activityDetailsData?.expenses || []}
          keyExtractor={(item) => `expense-item-${item.id}`}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={handleRefetch}
              colors={[colors['green-base']]}
            />
          }
          contentContainerClassName="flex-1 px-6 pt-4 pb-8"
          renderItem={() => <ExpenseItem />}
          ListHeaderComponent={
            <View className="flex-row items-start justify-between py-4">
              <View className="gap-y-3">
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="flex-row items-center gap-x-1"
                  onPress={handleBack}
                >
                  <ArrowIcon
                    height={16}
                    width={16}
                    color={colors['green-base']}
                  />

                  <Text className="font-label text-sm leading-normal text-green-base">
                    Voltar
                  </Text>
                </TouchableOpacity>

                <Text className="font-label text-xl leading-normal text-gray-100">
                  {activityDetailsData?.name}
                </Text>

                <View className="flex-row items-center gap-x-2">
                  <CalendarIcon
                    height={16}
                    width={16}
                    color={colors.gray[300]}
                  />

                  <Text className="font-body text-sm leading-normal text-gray-300">
                    {dateFormatted}
                  </Text>
                </View>
              </View>

              <View>
                <IconButton variant="secondary" icon={PencilIcon} />
              </View>
            </View>
          }
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center gap-y-4">
              <PieChartIcon height={24} width={24} color={colors.gray[400]} />

              <Text className="font-body text-sm text-center leading-normal text-gray-400">
                Para começar a dividir,{'\n'}registre uma despesa
              </Text>

              <View className="w-5/12">
                <Button leftIcon={AddIcon}>Nova despesa</Button>
              </View>
            </View>
          }
        />
      )}
    </SafeAreaView>
  )
}
