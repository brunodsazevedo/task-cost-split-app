import { ParticipantData } from '@/interfaces/http/ExpenseDetailsResponse'
import { useUpdateExpensePaymentToggleMutation } from '@/queries/useUpdateExpensePaymentToggle.mutation'

import { buildAvatarUrl } from '@/utils/buildAvatarUrl'
import { getStatusPaymentStyles } from '@/utils/getStatusPaymentStyles'
import { useGlobalSearchParams } from 'expo-router'

type ParticipantItemViewModelProps = {
  expenseId: string
  participantData: ParticipantData
}

export function useParticipantItemViewModel({
  participantData,
  expenseId,
}: ParticipantItemViewModelProps) {
  const routeParams = useGlobalSearchParams<{ id: string }>()

  const updatePaymentMutation = useUpdateExpensePaymentToggleMutation({
    activityId: routeParams.id,
    dataParams: {
      queryParams: {
        expenseId,
        participantId: participantData.userId,
      },
    },
    onSuccess: () => {},
  })

  const participantAvatarUri = buildAvatarUrl(participantData.name)

  const amount = participantData.amountOwedInCents / 100
  const amountFormatted = amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const statusPaymentStyles = getStatusPaymentStyles(
    participantData.paymentStatus,
  )

  function handleTogglePaymentStatus() {
    updatePaymentMutation.mutate()
  }

  return {
    participantData,
    participantAvatarUri,
    amountFormatted,
    statusPaymentStyles,
    handleTogglePaymentStatus,
  }
}
