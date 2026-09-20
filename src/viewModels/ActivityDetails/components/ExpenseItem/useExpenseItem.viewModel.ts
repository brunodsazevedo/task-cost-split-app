import { buildAvatarUrl } from '@/utils/buildAvatarUrl'
import { getStatusPaymentStyles } from '@/utils/getStatusPaymentStyles'

import { ExpenseData } from '@/interfaces/http/ActivityDetailResponse'

type Props = {
  expenseData: ExpenseData
  onPress?: () => void
}

export function useExpenseItemViewModel({ expenseData, onPress }: Props) {
  const expenseAmount = expenseData.amountInCents / 100
  const expenseValuePerPerson = expenseAmount / expenseData.participants.length

  const expenseAmountFormatted = expenseAmount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const expenseValuePerPersonFormatted = expenseValuePerPerson.toLocaleString(
    'pt-BR',
    {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  )

  const participantsAvatarUrls = expenseData.participants.map(
    (participant) => ({
      avatarUrl: buildAvatarUrl(participant.name),
    }),
  )

  const paymentStatus = getStatusPaymentStyles(
    expenseData.paymentStatus ?? 'pending',
  )

  return {
    expenseData,
    expenseAmountFormatted,
    expenseValuePerPersonFormatted,
    participantsAvatarUrls,
    paymentStatus,
    onPress,
  }
}
