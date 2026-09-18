import { useMutation } from '@tanstack/react-query'

import * as expenseService from '@/services/expense.service'

import { CreateExpenseRequestData } from '@/interfaces/http/CreateExpenseRequestData'

export function useCreateExpenseMutation() {
  const mutation = useMutation({
    mutationFn: (requestData: CreateExpenseRequestData) =>
      expenseService.createExpense(requestData),
    onError: (error) => {
      console.log(error)
    },
  })

  return mutation
}
