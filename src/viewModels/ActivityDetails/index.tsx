import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { twMerge } from 'tailwind-merge'

import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { ExpenseItem } from './components/ExpenseItem'

import { colors } from '@/theme/colors'

import CalendarIcon from '@/assets/icons/blank-calendar.svg'
import ArrowIcon from '@/assets/icons/arrow-left.svg'
import PencilIcon from '@/assets/icons/pencil.svg'
import PieChartIcon from '@/assets/icons/pie-chart.svg'
import AddIcon from '@/assets/icons/add.svg'

import { useActivityDetailsViewModel } from './useActivityDetails.viewModel'

type Props = ReturnType<typeof useActivityDetailsViewModel>

export function ActivityDetailsView({
  activityDetailsData,
  dateFormatted,
  isLoading,
  participantsAvatarUrls,
  totalExpensesFormatted,
  handleRefetch,
  handleBack,
  handleShowCreateExpenseModal,
  handleShowEditActivityModal,
  handleShowExpenseDetailsModal,
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
          contentContainerClassName={twMerge(
            'px-6 pt-4 pb-28 gap-y-2',
            activityDetailsData?.expenses.length === 0 && 'flex-1',
          )}
          ListHeaderComponent={
            <View className="py-2 gap-y-6">
              <View className="flex-row items-start justify-between">
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
                  <IconButton
                    variant="secondary"
                    icon={PencilIcon}
                    onPress={handleShowEditActivityModal}
                  />
                </View>
              </View>

              {activityDetailsData &&
                activityDetailsData?.expenses.length > 0 && (
                  <View className="gap-y-5">
                    <View className="flex-row items-center justify-between">
                      <View className="gap-y-1">
                        <View className="flex-row items-center">
                          {participantsAvatarUrls.map((avatar, index) => (
                            <Image
                              key={index}
                              alt={`uri-avatar-${index}`}
                              source={{ uri: avatar.avatarUrl }}
                              className="h-7 w-7 rounded-full -mr-2 border border-gray-700"
                            />
                          ))}
                        </View>

                        <Text className="font-body text-sm leading-normal text-gray-100">
                          {activityDetailsData?.participants.length}{' '}
                          participantes
                        </Text>
                      </View>

                      <View className="gap-y-1 items-end">
                        <Text className="font-label text-base leading-normal text-green-base">
                          {totalExpensesFormatted}
                        </Text>

                        <Text className="font-body text-sm leading-normal text-gray-400">
                          Gastos totais
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row items-center justify-between">
                      <Text className="font-body text-base leading-normal text-gray-200">
                        Despesas
                      </Text>

                      <Text className="font-body text-sm leading-normal text-gray-400">
                        {activityDetailsData?.expenses.length}
                      </Text>
                    </View>
                  </View>
                )}
            </View>
          }
          renderItem={({ item }) => (
            <ExpenseItem
              expenseData={item}
              onPress={() => handleShowExpenseDetailsModal(item.id)}
            />
          )}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center gap-y-4">
              <PieChartIcon height={24} width={24} color={colors.gray[400]} />

              <Text className="font-body text-sm text-center leading-normal text-gray-400">
                Para começar a dividir,{'\n'}registre uma despesa
              </Text>

              <View className="w-5/12">
                <Button
                  leftIcon={AddIcon}
                  onPress={handleShowCreateExpenseModal}
                >
                  Nova despesa
                </Button>
              </View>
            </View>
          }
        />
      )}

      {activityDetailsData && activityDetailsData.expenses.length > 0 && (
        <View className="absolute bottom-12 right-6 w-3/12">
          <Button leftIcon={AddIcon} onPress={handleShowCreateExpenseModal}>
            Nova
          </Button>
        </View>
      )}
    </SafeAreaView>
  )
}
