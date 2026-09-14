import { taskCostSplitApiClient } from '@/api/taskCostSplit'

import { SignInRequestParams } from '@/interfaces/http/SignInRequestParams'
import { AuthResponse } from '@/interfaces/http/AuthResponse'

export async function signin(params: SignInRequestParams) {
  const { data } = await taskCostSplitApiClient.post<AuthResponse>(
    '/users/sign-in',
    params,
  )

  return data
}
