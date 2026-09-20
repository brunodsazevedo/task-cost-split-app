export interface ExpenseDetailsResponse {
  createdAt: string
  payer: Payer
  activityName: string
  amountInCents: number
  id: string
  activityId: string
  name: string
  participants: ParticipantData[]
  payments: any[]
}

export interface ParticipantData {
  userId: string
  amountPaidInCents: number
  remainingDebtInCents: number
  name: string
  email: string
  amountOwedInCents: number
  paymentStatus: string
}

interface Payer {
  userId: string
  name: string
  email: string
}
