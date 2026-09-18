import { taskCostSplitApiClient } from '@/api/taskCostSplit'

import { CreateExpenseRequestData } from '@/interfaces/http/CreateExpenseRequestData'
import { CreateExpenseResponse } from '@/interfaces/http/CreateExpenseResponse'

export async function createExpense({
  params,
  data,
}: CreateExpenseRequestData) {
  const { data: responseData } =
    await taskCostSplitApiClient.post<CreateExpenseResponse>(
      `/activities/${params.activityId}/expenses`,
      data,
    )

  return responseData
}
