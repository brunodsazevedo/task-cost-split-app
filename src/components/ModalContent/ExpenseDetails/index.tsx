import { ExpenseDetailsView } from './ExpenseDetails.view'
import { useExpenseDetailsViewModel } from './useExpenseDetails.viewModel'

type Props = {
  expenseId: string
  onSuccess?: () => void
}

export function ExpenseDetails({ expenseId, onSuccess }: Props) {
  const viewModel = useExpenseDetailsViewModel({ expenseId, onSuccess })

  return <ExpenseDetailsView {...viewModel} />
}
