import { ActivitiesView } from '@/viewModels/Activities/Activities.view'
import { useActivitiesViewModel } from '@/viewModels/Activities/useActivitiesViewModel'

export default function Activities() {
  const viewModel = useActivitiesViewModel()

  return <ActivitiesView {...viewModel} />
}
