import { useMutation } from '@tanstack/react-query'

import * as userService from '@/services/user.service'

import { SignInRequestParams } from '@/interfaces/http/SignInRequestParams'

export function useSigninMutation() {
  const mutation = useMutation({
    mutationFn: (signInData: SignInRequestParams) =>
      userService.signin(signInData),
    onSuccess: (data) => {
      console.log('Sign-in successful:', data)
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return mutation
}
