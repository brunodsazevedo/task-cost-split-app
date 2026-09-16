import { useActivityItemViewModel } from './useActivityItem.viewModel'
import { ActivityItemView } from './ActivityItem.view'

import { ActivityData } from '@/interfaces/http/ActivityListResponse'

interface Props {
  activityData: ActivityData
  onActivityPress?: () => void
}

export function ActivityItem(props: Props) {
  const viewModel = useActivityItemViewModel(props)

  return <ActivityItemView {...viewModel} />
}
