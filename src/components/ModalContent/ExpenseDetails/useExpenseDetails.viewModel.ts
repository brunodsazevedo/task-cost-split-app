import { createElement } from 'react'
import { useGlobalSearchParams } from 'expo-router'

import { toast } from '@/components/ui/Toast'
import { CreateUpdateExpense } from '@/components/ModalContent/CreateUpdateExpense'

import { useDeleteExpenseMutation } from '@/queries/useDeleteExpense.mutation'
import { useGetExpenseDetailsQuery } from '@/queries/useGetExpenseDetails.query'

import { useBottomSheetStore } from '@/store/useBottomSheetStore'

import { getConsolidatedPaymentStatus } from '@/utils/getConsolidatedPaymentStatus'
import { getStatusPaymentStyles } from '@/utils/getStatusPaymentStyles'
import { AppError } from '@/utils/AppError'

type Props = {
  expenseId: string
  onSuccess?: () => void
}

export function useExpenseDetailsViewModel({ expenseId, onSuccess }: Props) {
  const routeParams = useGlobalSearchParams<{ id: string }>()
  const { data: expenseDetailsData, isLoading: isExpenseDetailsLoading } =
    useGetExpenseDetailsQuery({ expenseId })
  const deleteExpenseMutation = useDeleteExpenseMutation({
    activityId: routeParams.id,
  })
  const { open, close } = useBottomSheetStore()

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

  async function handleDeleteExpense() {
    try {
      await deleteExpenseMutation.mutateAsync(expenseId)

      close()

      toast.show({
        type: 'success',
        text1: 'Despesa deletada com sucesso!',
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : 'Ocorreu um erro ao deletar a despesa. Tente novamente mais tarde.'

      toast.show({
        type: 'error',
        text1: message,
      })
    }
  }

  function handleShowUpdateExpenseModal() {
    open({
      content: createElement(CreateUpdateExpense, {
        activityId: routeParams.id,
        expenseData: expenseDetailsData,
        onSuccess,
      }),
    })
  }

  return {
    isExpenseDetailsLoading,
    isDeleteExpenseLoading: deleteExpenseMutation.isPending,
    expenseDetailsData,
    amountFormatted,
    statusConsolidated,
    statusPaymentStyles,
    handleClose,
    handleDeleteExpense,
    handleShowUpdateExpenseModal,
  }
}
