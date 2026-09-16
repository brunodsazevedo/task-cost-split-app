import { taskCostSplitApiClient } from '@/api/taskCostSplit'

import { ActivityListRequestParams } from '@/interfaces/http/ActivityListRequestParams'
import { ActivityListResponse } from '@/interfaces/http/ActivityListResponse'
import { ActivityResponse } from '@/interfaces/http/ActivityResponse'
import { CreateUpdateActivityRequestParams } from '@/interfaces/http/CreateUpdateActivityRequestParams'

export async function getActivities({ params }: ActivityListRequestParams) {
  const { data } = await taskCostSplitApiClient.get<ActivityListResponse>(
    `/users/${params.userId}/activities`,
  )

  return data.activities
}

export async function createActivity(
  params: CreateUpdateActivityRequestParams,
) {
  const { data } = await taskCostSplitApiClient.post<ActivityResponse>(
    '/activities',
    params.data,
  )

  return data
}
