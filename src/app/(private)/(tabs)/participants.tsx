import { useParticipantsViewModel } from '@/viewModels/Participants/useParticipants.viewModel'
import { ParticipantsView } from '@/viewModels/Participants'

export default function Participants() {
  const viewModel = useParticipantsViewModel()

  return <ParticipantsView {...viewModel} />
}
