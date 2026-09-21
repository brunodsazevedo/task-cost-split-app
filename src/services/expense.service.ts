import { taskCostSplitApiClient } from '@/api/taskCostSplit'

import { CreateExpenseRequestData } from '@/interfaces/http/CreateExpenseRequestData'
import { CreateExpenseResponse } from '@/interfaces/http/CreateExpenseResponse'
import { ExpenseDetailsResponse } from '@/interfaces/http/ExpenseDetailsResponse'
import { UpdateExpensePaymentToggleRequestParams } from '@/interfaces/http/UpdateExpensePaymentToggleRequestParams'
import { UpdateExpensePaymentToggleResponse } from '@/interfaces/http/UpdateExpensePaymentToggleResponse'
import { UpdateExpenseRequestData } from '@/interfaces/http/UpdateExpenseRequestData'
import { UpdateExpenseResponse } from '@/interfaces/http/UpdateExpenseResponse'

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

export async function deleteExpense(expenseId: string) {
  await taskCostSplitApiClient.delete(`/expenses/${expenseId}`)
}

export async function updateExpense({
  queryParams,
  data,
}: UpdateExpenseRequestData) {
  const { data: responseData } =
    await taskCostSplitApiClient.put<UpdateExpenseResponse>(
      `/expenses/${queryParams.expenseId}`,
      data,
    )

  return responseData
}
