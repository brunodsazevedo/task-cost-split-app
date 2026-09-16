import { useQuery } from '@tanstack/react-query'

import * as activitiesService from '@/services/activity.service'

interface UseActivityListQueryParams {
  userId: string
}

export function useActivityListQuery({ userId }: UseActivityListQueryParams) {
  const query = useQuery({
    queryKey: ['activities'],
    queryFn: () => activitiesService.getActivities({ params: { userId } }),
  })

  return query
}
