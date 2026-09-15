import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { SigninFormData, signinScheme } from './signin.scheme'

export function useSigninViewModel() {
  const { control, handleSubmit } = useForm<SigninFormData>({
    resolver: zodResolver(signinScheme),
  })

  async function onSignIn(dataForm: SigninFormData) {
    console.log(dataForm)
  }

  const handleSignIn = handleSubmit(onSignIn)

  return { control, handleSignIn }
}
