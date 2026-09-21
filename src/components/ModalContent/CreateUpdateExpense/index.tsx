import { ExpenseDetailsResponse } from '@/interfaces/http/ExpenseDetailsResponse'
import { CreateUpdateExpenseView } from './CreateUpdateExpense.view'

import { useCreateUpdateExpenseViewModel } from './useCreateUpdateExpense.viewModel'

type Props = {
  activityId: string
  expenseData?: ExpenseDetailsResponse
  onSuccess?: () => void
}

export function CreateUpdateExpense(props: Props) {
  const viewModel = useCreateUpdateExpenseViewModel(props)

  return <CreateUpdateExpenseView {...viewModel} />
}
