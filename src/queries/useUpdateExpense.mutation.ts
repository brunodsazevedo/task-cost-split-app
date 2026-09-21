import { useMutation } from '@tanstack/react-query'

import * as expenseService from '@/services/expense.service'

export function useUpdateExpenseMutation() {
  const mutation = useMutation({
    mutationFn: expenseService.updateExpense,
    onError: (error) => {
      console.log(error)
    },
  })

  return mutation
}
