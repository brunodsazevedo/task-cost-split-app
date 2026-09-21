import { useQuery } from '@tanstack/react-query'

import * as statisticsService from '@/services/user.service'

interface UseGetStatisticsQueryProps {
  userId: string
}

export function useGetStatisticsQuery({ userId }: UseGetStatisticsQueryProps) {
  const query = useQuery({
    queryKey: ['statistics', userId],
    queryFn: () => statisticsService.getStatistics(),
  })

  return query
}
