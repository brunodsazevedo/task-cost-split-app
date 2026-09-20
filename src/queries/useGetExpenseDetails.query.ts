import { useQuery } from '@tanstack/react-query'

import * as expenseService from '@/services/expense.service'

type Props = {
  expenseId: string
}

export function useGetExpenseDetailsQuery({ expenseId }: Props) {
  const query = useQuery({
    queryKey: ['expenseDetails', expenseId],
    queryFn: () => expenseService.getExpenseDetails(expenseId),
  })

  return query
}
