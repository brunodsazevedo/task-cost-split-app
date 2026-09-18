import { ActivityModalView } from './ActivityModal.view'
import { useActivityModalViewModel } from './useActivityModalViewModel'

import { ActivityDetailResponse } from '@/interfaces/http/ActivityDetailResponse'

export type ActivityModalProps = {
  activityData?: ActivityDetailResponse
}

export function ActivityModal(props?: ActivityModalProps) {
  const viewModel = useActivityModalViewModel({
    activityData: props?.activityData,
  })

  return <ActivityModalView {...viewModel} />
}
