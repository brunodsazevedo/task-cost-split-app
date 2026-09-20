import { useMutation, useQueryClient } from '@tanstack/react-query'

import * as expenseService from '@/services/expense.service'

import { UpdateExpensePaymentToggleRequestParams } from '@/interfaces/http/UpdateExpensePaymentToggleRequestParams'
import { ExpenseDetailsResponse } from '@/interfaces/http/ExpenseDetailsResponse'
import { ActivityDetailResponse } from '@/interfaces/http/ActivityDetailResponse'

import { getConsolidatedPaymentStatus } from '@/utils/getConsolidatedPaymentStatus'

type Props = {
  activityId: string
  dataParams: UpdateExpensePaymentToggleRequestParams
  onSuccess?: () => void
}

export function useUpdateExpensePaymentToggleMutation(props: Props) {
  const queryClient = useQueryClient()
  const activityDetailsQueryKey = ['activityDetails', props.activityId]
  const expenseQueryKey = [
    'expenseDetails',
    props.dataParams.queryParams.expenseId,
  ]

  const mutation = useMutation({
    mutationFn: async () =>
      await expenseService.updateExpensePaymentToggle(props.dataParams),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: expenseQueryKey })
      const previousData =
        queryClient.getQueryData<ExpenseDetailsResponse>(expenseQueryKey)

      queryClient.setQueryData(
        expenseQueryKey,
        (oldData: ExpenseDetailsResponse) => {
          if (!oldData) return oldData

          return {
            ...oldData,
            participants: oldData.participants.map((participant) => ({
              ...participant,
              paymentStatus:
                participant.userId ===
                props.dataParams.queryParams.participantId
                  ? participant.paymentStatus === 'paid'
                    ? 'pending'
                    : 'paid'
                  : participant.paymentStatus,
            })),
          }
        },
      )

      return { previousData }
    },
    onSuccess: (response) => {
      queryClient.setQueryData(
        expenseQueryKey,
        (oldData: ExpenseDetailsResponse | undefined) => {
          if (!oldData) return oldData

          return {
            ...oldData,
            participants: oldData.participants.map((participant) =>
              participant.userId === response.participantId
                ? {
                    ...participant,
                    paymentStatus: response.paymentStatus,
                    amountPaidInCents: response.amountPaidInCents,
                    remainingDebtInCents: response.remainingDebtInCents,
                  }
                : participant,
            ),
          }
        },
      )

      queryClient.setQueryData(
        activityDetailsQueryKey,
        (oldData: ActivityDetailResponse | undefined) => {
          if (!oldData) return oldData

          return {
            ...oldData,
            expenses: oldData.expenses.map((expense) => {
              if (expense.id !== response.expenseId) return expense

              const updatedParticipants = expense.participants.map(
                (participant) =>
                  participant.id === response.participantId
                    ? { ...participant, paymentStatus: response.paymentStatus }
                    : participant,
              )

              return {
                ...expense,
                participants: updatedParticipants,
                paymentStatus:
                  getConsolidatedPaymentStatus(updatedParticipants).status,
              }
            }),
          }
        },
      )

      props.onSuccess?.()
    },
    onError: (error, _, context) => {
      console.log(error)

      queryClient.setQueryData(expenseQueryKey, context?.previousData)
    },
  })

  return mutation
}
