import { taskCostSplitApiClient } from '@/api/taskCostSplit'

import { ActivityListRequestParams } from '@/interfaces/http/ActivityListRequestParams'
import { ActivityListResponse } from '@/interfaces/http/ActivityListResponse'

export async function getActivities({ params }: ActivityListRequestParams) {
  const { data } = await taskCostSplitApiClient.get<ActivityListResponse>(
    `/users/${params.userId}/activities`,
  )

  return data.activities
}
