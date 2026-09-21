import { View, Text, ScrollView, ActivityIndicator } from 'react-native'

import { HeaderTab } from '@/components/HeaderTab'
import { Button } from '@/components/ui/Button'

import { colors } from '@/theme/colors'

import CheckIcon from '@/assets/icons/check.svg'
import WarningIcon from '@/assets/icons/warning-octagon.svg'
import PieChartIcon from '@/assets/icons/pie-chart.svg'
import BulletListIcon from '@/assets/icons/bullet-list.svg'
import DollarCoinIcon from '@/assets/icons/dollar-coin.svg'
import UserMultipleGroupIcon from '@/assets/icons/user-multiple-group.svg'
import AddIcon from '@/assets/icons/add.svg'

import { useResumeViewModel } from './useResume.viewModel'

type Props = ReturnType<typeof useResumeViewModel>

export function ResumeView({
  statisticsData,
  amountPaidFormatted,
  amountToPayFormatted,
  activitiesCountFormatted,
  expenseCountFormatted,
  totalExpensesAmountFormatted,
  uniqueParticipantsCountFormatted,
  isLoading,
  handleGoActivities,
}: Props) {
  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center bg-base">
        <ActivityIndicator size="large" color={colors['green-base']} />
      </View>
    )

  return (
    <View className="flex-1 bg-base">
      <HeaderTab />

      {statisticsData?.activitiesCount === 0 ? (
        <View className="flex-1 items-center justify-center gap-y-4">
          <PieChartIcon height={24} width={24} color={colors.gray['400']} />

          <Text className="font-body text-sm text-center text-gray-400">
            Para começar a acompanhar,{'\n'}crie uma atividade
          </Text>

          <View className="w-5/12">
            <Button leftIcon={AddIcon} onPress={handleGoActivities}>
              Criar atividade
            </Button>
          </View>
        </View>
      ) : (
        <ScrollView contentContainerClassName="gap-y-4 px-6 pb-8">
          <View>
            <Text className="font-label text-xl leading-normal text-gray-100">
              Resumo
            </Text>

            <Text className="font-body text-body leading-normal text-gray-300">
              Acompanhe as informações principais sobre suas atividades
            </Text>
          </View>

          <View className="gap-y-3">
            <Text className="font-label text-sm leading-normal text-gray-100">
              Minhas contas
            </Text>

            <View className="flex-row items-center gap-4 rounded-xl p-4 border border-gray-600">
              <View className="items-center justify-center p-4 rounded-lg bg-success-dark">
                <CheckIcon
                  height={16}
                  width={16}
                  color={colors['success-light']}
                />
              </View>

              <View>
                <Text className="font-heading text-xl leading-snug text-gray-200">
                  {amountPaidFormatted}
                </Text>

                <Text className="font-body text-sm leading-normal text-gray-300">
                  Pago em {statisticsData?.paidExpensesCount} despesas
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-4 rounded-xl p-4 border border-gray-600">
              <View className="items-center justify-center p-4 rounded-lg bg-danger-dark">
                <WarningIcon
                  height={16}
                  width={16}
                  color={colors['danger-light']}
                />
              </View>

              <View>
                <Text className="font-heading text-xl leading-snug text-gray-200">
                  {amountToPayFormatted}
                </Text>

                <Text className="font-body text-sm leading-normal text-gray-300">
                  Pendente em {statisticsData?.expensesToPayCount} despesas
                </Text>
              </View>
            </View>
          </View>

          <View className="gap-y-3">
            <Text className="font-label text-sm leading-normal text-gray-100">
              Informações gerais
            </Text>

            <View className="flex-row items-center gap-4 rounded-xl p-4 border border-gray-600">
              <View className="items-center justify-center p-4 rounded-lg bg-gray-700">
                <PieChartIcon
                  height={16}
                  width={16}
                  color={colors['green-base']}
                />
              </View>

              <View>
                <Text className="font-heading text-xl leading-snug text-gray-200">
                  {totalExpensesAmountFormatted}
                </Text>

                <Text className="font-body text-sm leading-normal text-gray-300">
                  Total de despesas
                </Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between gap-x-2">
              <View className="flex-1 rounded-xl border border-gray-600 p-3">
                <Text className="font-heading text-xl leading-snug text-gray-200">
                  {activitiesCountFormatted}
                </Text>

                <Text className="font-body text-sm leading-normal text-gray-300">
                  Atividades
                </Text>

                <View className="absolute right-3 top-2">
                  <BulletListIcon
                    height={16}
                    width={16}
                    color={colors['green-light']}
                  />
                </View>
              </View>

              <View className="flex-1 rounded-xl border border-gray-600 p-3">
                <Text className="font-heading text-xl leading-snug text-gray-200">
                  {expenseCountFormatted}
                </Text>

                <Text className="font-body text-sm leading-normal text-gray-300">
                  Despesas
                </Text>

                <View className="absolute right-3 top-2">
                  <DollarCoinIcon
                    height={16}
                    width={16}
                    color={colors['green-light']}
                  />
                </View>
              </View>

              <View className="flex-1 rounded-xl border border-gray-600 p-3">
                <Text className="font-heading text-xl leading-snug text-gray-200">
                  {uniqueParticipantsCountFormatted}
                </Text>

                <Text className="font-body text-sm leading-normal text-gray-300">
                  participantes
                </Text>

                <View className="absolute right-3 top-2">
                  <UserMultipleGroupIcon
                    height={16}
                    width={16}
                    color={colors['green-light']}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  )
}
