import { useLocalSearchParams } from 'expo-router'

import { ActivityDetailsView } from '@/viewModels/ActivityDetails'

import { useActivityDetailsViewModel } from '@/viewModels/ActivityDetails/useActivityDetails.viewModel'

type RouteParams = {
  id: string
}

export default function ActivityDetail() {
  const { id } = useLocalSearchParams<RouteParams>()
  const viewModel = useActivityDetailsViewModel({ activityId: id })

  return <ActivityDetailsView {...viewModel} />
}
