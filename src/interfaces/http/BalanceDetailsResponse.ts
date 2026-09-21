export interface BalanceDetailsResponse {
  totalUserOwesInCents: number
  credits: DebtCreditDetails[]
  debts: DebtCreditDetails[]
  totalOwedToUserInCents: number
}

interface DebtCreditDetails {
  expenseId: string
  activityId: string
  creditorId: string
  creditorName: string
  debtorId: string
  debtorName: string
  amountInCents: number
  activityName: string
  expenseName: string
}
