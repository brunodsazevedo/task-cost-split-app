import { CreateExpenseView } from './CreateExpense.view'

import { useCreateExpenseViewModel } from './useCreateExpense.viewModel'

type Props = {
  activityId: string
  onSuccess?: () => void
}

export function CreateExpense({ activityId, onSuccess }: Props) {
  const viewModel = useCreateExpenseViewModel({ activityId, onSuccess })

  return <CreateExpenseView {...viewModel} />
}
