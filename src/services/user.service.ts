import { taskCostSplitApiClient } from '@/api/taskCostSplit'

import { SignInRequestParams } from '@/interfaces/http/SignInRequestParams'
import { AuthResponse } from '@/interfaces/http/AuthResponse'
import { SignUpRequestParams } from '@/interfaces/http/SignUpRequestParams'
import { UserListResponse } from '@/interfaces/http/UserListResponse'
import { UserStatisticsResponse } from '@/interfaces/http/UserStatisticsResponse'

export async function signin(params: SignInRequestParams) {
  const { data } = await taskCostSplitApiClient.post<AuthResponse>(
    '/users/sign-in',
    params,
  )

  return data
}

export async function signup(params: SignUpRequestParams) {
  const { data } = await taskCostSplitApiClient.post<AuthResponse>(
    '/users/sign-up',
    params.data,
  )

  return data
}

export async function getUsers() {
  const { data } = await taskCostSplitApiClient.get<UserListResponse>('/users')

  return data.users
}

export async function getStatistics() {
  const { data } = await taskCostSplitApiClient.get<UserStatisticsResponse>(
    '/users/me/statistics',
  )

  return data
}
