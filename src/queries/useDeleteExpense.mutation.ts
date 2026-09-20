import { useMutation, useQueryClient } from '@tanstack/react-query'

import * as expenseService from '@/services/expense.service'

import { ActivityDetailResponse } from '@/interfaces/http/ActivityDetailResponse'

type Props = {
  activityId: string
}

export function useDeleteExpenseMutation(props: Props) {
  const queryClient = useQueryClient()
  const activityDetailsQueryKey = ['activityDetails', props.activityId]

  const mutation = useMutation({
    mutationFn: (expenseId: string) => expenseService.deleteExpense(expenseId),
    onSuccess: (_, expenseId) => {
      queryClient.invalidateQueries({ queryKey: activityDetailsQueryKey })

      queryClient.setQueryData(
        activityDetailsQueryKey,
        (data: ActivityDetailResponse | undefined) => {
          if (!data) return data

          return {
            ...data,
            expenses: data.expenses.filter(
              (expense) => expense.id !== expenseId,
            ),
          }
        },
      )
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return mutation
}
