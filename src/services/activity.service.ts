import { taskCostSplitApiClient } from '@/api/taskCostSplit'
import { ActivityDetailResponse } from '@/interfaces/http/ActivityDetailResponse'

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

export async function activityDetails(activityId: string) {
  const { data } = await taskCostSplitApiClient.get<ActivityDetailResponse>(
    `/activities/${activityId}`,
  )

  return data
}

export async function updateActivity(
  params: CreateUpdateActivityRequestParams,
) {
  const { data } = await taskCostSplitApiClient.put<ActivityResponse>(
    `/activities/${params.queryParams?.activityId}`,
    params.data,
  )

  return data
}

export async function deleteActivity(activityId: string) {
  await taskCostSplitApiClient.delete(`/activities/${activityId}`)
}
