import { useQuery } from '@tanstack/react-query'

import * as activityService from '@/services/activity.service'

interface UseActivityDetailsQueryProps {
  activityId: string
}

export function useActivityDetailsQuery({
  activityId,
}: UseActivityDetailsQueryProps) {
  const query = useQuery({
    queryKey: ['activityDetails', activityId],
    queryFn: () => activityService.activityDetails(activityId),
  })

  return query
}
