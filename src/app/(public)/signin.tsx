import { useSigninViewModel } from '@/viewModels/Signin/useSigninViewModel'
import { SigninView } from '@/viewModels/Signin/signin.view'

export default function Signin() {
  const viewModel = useSigninViewModel()

  return <SigninView {...viewModel} />
}
