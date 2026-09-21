import { taskCostSplitApiClient } from '@/api/taskCostSplit'

import { BalanceDetailsResponse } from '@/interfaces/http/BalanceDetailsResponse'

export async function getBalanceDetails(userId: string) {
  const { data } = await taskCostSplitApiClient.get<BalanceDetailsResponse>(
    `/balance/users/${userId}/detailed`,
  )

  return data
}
