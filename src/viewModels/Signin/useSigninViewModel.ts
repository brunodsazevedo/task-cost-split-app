import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from '@/components/ui/Toast'

import { useSigninMutation } from '@/queries/useSignin.mutation'

import { AppError } from '@/utils/AppError'

import { SigninFormData, signinScheme } from './signin.scheme'

export function useSigninViewModel() {
  const { control, handleSubmit } = useForm<SigninFormData>({
    resolver: zodResolver(signinScheme),
  })

  const mutation = useSigninMutation()

  async function onSignIn(dataForm: SigninFormData) {
    try {
      await mutation.mutateAsync(dataForm)
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : 'Não foi possível entrar. Tente novamente mais tarde.'

      toast.show({
        type: 'error',
        text1: 'Erro ao fazer login!',
        text2: message,
      })
    }
  }

  const handleSignIn = handleSubmit(onSignIn)

  return { control, handleSignIn }
}
