import { useGetExpenseDetailsQuery } from '@/queries/useGetExpenseDetails.query'

import { useBottomSheetStore } from '@/store/useBottomSheetStore'

import { getConsolidatedPaymentStatus } from '@/utils/getConsolidatedPaymentStatus'
import { getStatusPaymentStyles } from '@/utils/getStatusPaymentStyles'

type Props = {
  expenseId: string
}

export function useExpenseDetailsViewModel({ expenseId }: Props) {
  const { close } = useBottomSheetStore()
  const { data: expenseDetailsData, isLoading: isExpenseDetailsLoading } =
    useGetExpenseDetailsQuery({ expenseId })

  const statusConsolidated = getConsolidatedPaymentStatus(
    expenseDetailsData?.participants ?? [],
  )
  const statusPaymentStyles = getStatusPaymentStyles(statusConsolidated.status)

  const amount = (expenseDetailsData?.amountInCents ?? 0) / 100

  const amountFormatted = amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  function handleClose() {
    close()
  }

  return {
    isExpenseDetailsLoading,
    expenseDetailsData,
    amountFormatted,
    statusConsolidated,
    statusPaymentStyles,
    handleClose,
  }
}
