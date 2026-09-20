import { ExpenseDetailsView } from './ExpenseDetails.view'
import { useExpenseDetailsViewModel } from './useExpenseDetails.viewModel'

type Props = {
  expenseId: string
}

export function ExpenseDetails({ expenseId }: Props) {
  const viewModel = useExpenseDetailsViewModel({ expenseId })

  return <ExpenseDetailsView {...viewModel} />
}
