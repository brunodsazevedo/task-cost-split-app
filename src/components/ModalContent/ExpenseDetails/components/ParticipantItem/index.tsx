import { ParticipantItemView } from './ParticipantItem.view'
import { useParticipantItemViewModel } from './useParticipantItem.viewModel'

import { ParticipantData } from '@/interfaces/http/ExpenseDetailsResponse'

type ParticipantItemProps = {
  expenseId: string
  participantData: ParticipantData
}

export function ParticipantItem(props: ParticipantItemProps) {
  const viewModel = useParticipantItemViewModel(props)

  return <ParticipantItemView {...viewModel} />
}
