export interface UpdateExpenseRequestData {
  queryParams: {
    expenseId: string
  }

  data: {
    title: string
    amountInCents: number
    payerId: string
    participantsIds: string[]
  }
}
