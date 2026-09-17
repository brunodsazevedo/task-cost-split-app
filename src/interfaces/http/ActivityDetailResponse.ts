import { UserData } from '@/interfaces/http/UserListResponse'

export interface ActivityDetailResponse {
  activityDate: string
  expenses: Expense[]
  id: string
  participants: UserData[]
  name: string
  totalAmountInCents: number
}

interface Expense {
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
