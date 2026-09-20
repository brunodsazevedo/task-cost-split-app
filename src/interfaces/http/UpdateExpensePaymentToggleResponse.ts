export interface UpdateExpensePaymentToggleResponse {
  participantId: string
  participantName: string
  amountPaidInCents: number
  participantEmail: string
  expenseId: string
  remainingDebtInCents: number
  paymentStatus: string
  amountOwedInCents: number
}
