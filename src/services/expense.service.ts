import { taskCostSplitApiClient } from '@/api/taskCostSplit'

import { CreateExpenseRequestData } from '@/interfaces/http/CreateExpenseRequestData'
import { CreateExpenseResponse } from '@/interfaces/http/CreateExpenseResponse'
import { ExpenseDetailsResponse } from '@/interfaces/http/ExpenseDetailsResponse'
import { UpdateExpensePaymentToggleRequestParams } from '@/interfaces/http/UpdateExpensePaymentToggleRequestParams'
import { UpdateExpensePaymentToggleResponse } from '@/interfaces/http/UpdateExpensePaymentToggleResponse'

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

export async function getExpenseDetails(expenseId: string) {
  const { data } = await taskCostSplitApiClient.get<ExpenseDetailsResponse>(
    `/expenses/${expenseId}`,
  )

  return data
}

export async function updateExpensePaymentToggle({
  queryParams,
}: UpdateExpensePaymentToggleRequestParams) {
  const { data } =
    await taskCostSplitApiClient.put<UpdateExpensePaymentToggleResponse>(
      `/expenses/${queryParams.expenseId}/participants/${queryParams.participantId}/payment/toggle`,
    )

  return data
}
