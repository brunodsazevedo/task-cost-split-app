export interface CreateExpenseRequestData {
  params: {
    activityId: string
  }

  data: {
    participantsIds: string[]
    payerId: string
    title: string
    amountInCents: number
  }
}
