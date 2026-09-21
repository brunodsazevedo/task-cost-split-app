import { ResumeView } from '@/viewModels/Resume/Resume.view'
import { useResumeViewModel } from '@/viewModels/Resume/useResume.viewModel'

export default function Resume() {
  const viewModel = useResumeViewModel()

  return <ResumeView {...viewModel} />
}
