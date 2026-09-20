import { View, Text, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { HeaderModal } from '@/components/HeaderModal'
import { Divider } from '@/components/ui/Divider'
import { IconButton } from '@/components/ui/IconButton'
import { Button } from '@/components/ui/Button'
import { ParticipantItem } from './components/ParticipantItem'

import { colors } from '@/theme/colors'

import TrashIcon from '@/assets/icons/trash.svg'
import PencilIcon from '@/assets/icons/pencil.svg'

import { useExpenseDetailsViewModel } from './useExpenseDetails.viewModel'

type Props = ReturnType<typeof useExpenseDetailsViewModel>

export function ExpenseDetailsView({
  expenseDetailsData,
  isExpenseDetailsLoading,
  isDeleteExpenseLoading,
  amountFormatted,
  statusConsolidated,
  statusPaymentStyles,
  handleClose,
  handleDeleteExpense,
}: Props) {
  return (
    <View className="flex-1">
      <HeaderModal
        title={expenseDetailsData?.name ?? ''}
        subtitle={amountFormatted ?? ''}
        onClose={handleClose}
      />

      {isExpenseDetailsLoading ? (
        <View className="h-80 items-center justify-center">
          <ActivityIndicator size="large" color={colors['green-base']} />
        </View>
      ) : (
        <SafeAreaView edges={['bottom']} className="px-6 pb-8 gap-y-8">
          <View className="gap-y-4">
            <View className="flex-row items-center justify-between">
              <Text className="font-body text-sm text-gray-300">
                {expenseDetailsData?.participants.length ?? 0} participantes
              </Text>

              <View
                className="items-center justify-center px-2 py-1 rounded-lg"
                style={{ backgroundColor: statusPaymentStyles.backgroundColor }}
              >
                <Text
                  className="font-base text-xs leading-normal"
                  style={{ color: statusPaymentStyles.textColor }}
                >
                  {statusConsolidated.statusLabel}
                </Text>
              </View>
            </View>

            <Divider />

            {expenseDetailsData?.participants.map((participant) => (
              <ParticipantItem
                key={participant.userId}
                expenseId={expenseDetailsData.id}
                participantData={participant}
              />
            ))}
          </View>

          <View className="flex-row items-center justify-between">
            <View>
              <IconButton
                icon={TrashIcon}
                variant="danger"
                isLoading={isDeleteExpenseLoading}
                onPress={handleDeleteExpense}
              />
            </View>

            <View className="w-32">
              <Button variant="secondary" leftIcon={PencilIcon}>
                Editar
              </Button>
            </View>
          </View>
        </SafeAreaView>
      )}
    </View>
  )
}
