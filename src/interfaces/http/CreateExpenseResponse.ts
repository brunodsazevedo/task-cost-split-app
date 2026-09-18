export interface CreateExpenseResponse {
  activityId: string
  id: string
  amountInCents: number
  payerId: string
  name: string
  payerName: string
  participants: Participant[]
  createdAt: string
}

interface Participant {
  userName: string
  userId: string
  amountOwedInCents: number
}
