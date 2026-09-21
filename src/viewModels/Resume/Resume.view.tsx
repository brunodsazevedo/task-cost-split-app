import { View, Text, ScrollView } from 'react-native'

import { HeaderTab } from '@/components/HeaderTab'

import { colors } from '@/theme/colors'

import CheckIcon from '@/assets/icons/check.svg'
import WarningIcon from '@/assets/icons/warning-octagon.svg'
import PieChartIcon from '@/assets/icons/pie-chart.svg'
import BulletListIcon from '@/assets/icons/bullet-list.svg'
import DollarCoinIcon from '@/assets/icons/dollar-coin.svg'
import UserMultipleGroupIcon from '@/assets/icons/user-multiple-group.svg'

import { useResumeViewModel } from './useResume.viewModel'

type Props = ReturnType<typeof useResumeViewModel>

export function ResumeView({}: Props) {
  return (
    <View className="flex-1 bg-base">
      <HeaderTab />

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
                R$ 360,00
              </Text>

              <Text className="font-body text-sm leading-normal text-gray-300">
                Pago em 2 despesas
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
                R$ 360,00
              </Text>

              <Text className="font-body text-sm leading-normal text-gray-300">
                Pendente em 6 despesas
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
                R$ 360,00
              </Text>

              <Text className="font-body text-sm leading-normal text-gray-300">
                Total de despesas
              </Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between gap-x-2">
            <View className="flex-1 rounded-xl border border-gray-600 p-3">
              <Text className="font-heading text-xl leading-snug text-gray-200">
                05
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
                13
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
                6
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
    </View>
  )
}
