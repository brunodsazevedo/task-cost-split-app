import { UserData } from '@/interfaces/http/UserListResponse'

export interface ActivityDetailResponse {
  activityDate: string
  expenses: ExpenseData[]
  id: string
  participants: UserData[]
  name: string
  totalAmountInCents: number
}

export interface ExpenseData {
  participants: Participant[]
  payerName: string
  amountInCents: number
  payerId: string
  paymentStatus: string
  id: string
  name: string
}

interface Participant {
  paymentStatus: string
  id: string
  email: string
  name: string
}
