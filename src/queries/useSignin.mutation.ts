import { useMutation } from '@tanstack/react-query'

import * as userService from '@/services/user.service'

import { useUserStore } from '@/store/useUserStore'

import { SignInRequestParams } from '@/interfaces/http/SignInRequestParams'

export function useSigninMutation() {
  const { setSession } = useUserStore()

  const mutation = useMutation({
    mutationFn: (signInData: SignInRequestParams) =>
      userService.signin(signInData),
    onSuccess: (data) => {
      setSession({
        user: {
          id: data.id,
          name: data.name,
          email: data.email,
        },
        token: data.token,
      })
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return mutation
}
