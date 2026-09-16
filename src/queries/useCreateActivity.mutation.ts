import { useMutation } from '@tanstack/react-query'

import * as ActivityService from '@/services/activity.service'

import { CreateUpdateActivityRequestParams } from '@/interfaces/http/CreateUpdateActivityRequestParams'

interface Props {
  onSuccess?: () => void
}

export function useCreateActivityMutation({ onSuccess }: Props) {
  const mutation = useMutation({
    mutationFn: (data: CreateUpdateActivityRequestParams) =>
      ActivityService.createActivity(data),
    onSuccess: () => {
      onSuccess?.()
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return mutation
}
