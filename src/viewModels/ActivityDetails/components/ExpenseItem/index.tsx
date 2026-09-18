import { ExpenseItemView } from './ExpenseItem.view'
import { useExpenseItemViewModel } from './useExpenseItem.viewModel'

import { ExpenseData } from '@/interfaces/http/ActivityDetailResponse'

type Props = {
  expenseData: ExpenseData
}

export function ExpenseItem({ expenseData }: Props) {
  const viewModel = useExpenseItemViewModel({ expenseData })

  return <ExpenseItemView {...viewModel} />
}
