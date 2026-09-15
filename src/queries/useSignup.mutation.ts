import { useMutation } from '@tanstack/react-query'

import * as userService from '@/services/user.service'

import { useUserStore } from '@/store/useUserStore'

import { SignUpRequestParams } from '@/interfaces/http/SignUpRequestParams'

export function useSignupMutation() {
  const { setSession } = useUserStore()

  const mutation = useMutation({
    mutationFn: (signupDataParams: SignUpRequestParams) =>
      userService.signup(signupDataParams),
    onSuccess: (data) => {
      setSession({
        user: {
          id: data.id,
          email: data.email,
          name: data.name,
        },
        token: data.token,
      })
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return mutation
}
