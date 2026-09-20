import { ExpenseItemView } from './ExpenseItem.view'
import { useExpenseItemViewModel } from './useExpenseItem.viewModel'

import { ExpenseData } from '@/interfaces/http/ActivityDetailResponse'

type Props = {
  expenseData: ExpenseData
  onPress?: () => void
}

export function ExpenseItem({ expenseData, onPress }: Props) {
  const viewModel = useExpenseItemViewModel({ expenseData, onPress })

  return <ExpenseItemView {...viewModel} />
}
