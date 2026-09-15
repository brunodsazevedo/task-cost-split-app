import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'

import { toast } from '@/components/ui/Toast'

import { useSignupMutation } from '@/queries/useSignup.mutation'

import { AppError } from '@/utils/AppError'

import { signupScheme, SignupDataForm } from './signup.scheme'

export function useSignupViewModel() {
  const { control, handleSubmit } = useForm<SignupDataForm>({
    resolver: zodResolver(signupScheme),
  })

  const mutation = useSignupMutation()

  async function onSignup(dataForm: SignupDataForm) {
    const data = {
      name: dataForm.name,
      email: dataForm.email,
      password: dataForm.password,
    }

    try {
      await mutation.mutateAsync({
        data,
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : 'Não foi possível realizar o cadastro.'

      toast.show({
        type: 'error',
        text1: 'Erro ao realizar cadastro',
        text2: message,
      })
    }
  }

  function handleSignin() {
    router.push('/signin')
  }

  const handleSignup = handleSubmit(onSignup)

  return {
    control,
    isLoading: mutation.isPending,
    handleSignup,
    handleSignin,
  }
}
