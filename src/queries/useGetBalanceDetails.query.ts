import { useQuery } from '@tanstack/react-query'

import * as balanceDetailsService from '@/services/balance.service'

interface UseGetBalanceDetailsQueryProps {
  userId: string
}

export function useGetBalanceDetailsQuery({
  userId,
}: UseGetBalanceDetailsQueryProps) {
  const query = useQuery({
    queryKey: ['balanceDetails', userId],
    queryFn: () => balanceDetailsService.getBalanceDetails(userId),
  })

  return query
}
