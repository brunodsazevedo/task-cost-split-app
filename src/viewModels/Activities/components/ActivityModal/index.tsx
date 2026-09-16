import { ActivityModalView } from './ActivityModal.view'
import { useActivityModalViewModel } from './useActivityModalViewModel'

export function ActivityModal() {
  const viewModel = useActivityModalViewModel()

  return <ActivityModalView {...viewModel} />
}
