import { buildAvatarUrl } from '@/utils/buildAvatarUrl'

import { ExpenseData } from '@/interfaces/http/ActivityDetailResponse'

type Props = {
  expenseData: ExpenseData
}

export function useExpenseItemViewModel({ expenseData }: Props) {
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

  return {
    expenseData,
    expenseAmountFormatted,
    expenseValuePerPersonFormatted,
    participantsAvatarUrls,
  }
}
