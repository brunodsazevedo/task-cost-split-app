import { ExpenseItemView } from './ExpenseItem.view'

import { useExpenseItemViewModel } from './useExpenseItem.viewModel'

export function ExpenseItem() {
  const viewModel = useExpenseItemViewModel()

  return <ExpenseItemView {...viewModel} />
}
