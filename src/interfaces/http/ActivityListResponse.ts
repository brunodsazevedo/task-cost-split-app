export interface ActivityListResponse {
  activities: ActivityData[]
}

export interface ActivityData {
  participantsAmount: number
  participants: Participant[]
  activityDate: string
  expensesAmount: number
  id: string
  totalAmountInCents: number
  name: string
}

interface Participant {
  name: string
  email: string
  id: string
}
