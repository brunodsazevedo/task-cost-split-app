import { ExpenseData } from '@/interfaces/http/ActivityDetailResponse'

type Props = {
  expenseData: ExpenseData
}

export function useExpenseItemViewModel({ expenseData }: Props) {
  return { expenseData }
}
