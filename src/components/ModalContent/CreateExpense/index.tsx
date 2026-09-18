import { CreateExpenseView } from './CreateExpense.view'

import { useCreateExpenseViewModel } from './useCreateExpense.viewModel'

export function CreateExpense() {
  const viewModel = useCreateExpenseViewModel()

  return <CreateExpenseView {...viewModel} />
}
