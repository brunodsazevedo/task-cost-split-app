import { useSignupViewModel } from '@/viewModels/Signup/useSignupViewModel'
import { SignupView } from '@/viewModels/Signup/Signup.view'

export default function Signup() {
  const signUpViewModel = useSignupViewModel()

  return <SignupView {...signUpViewModel} />
}
