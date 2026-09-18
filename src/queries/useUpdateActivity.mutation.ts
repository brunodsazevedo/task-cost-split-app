import { useMutation } from '@tanstack/react-query'

import * as activityService from '@/services/activity.service'

import { CreateUpdateActivityRequestParams } from '@/interfaces/http/CreateUpdateActivityRequestParams'

type Props = {
  onSuccess?: () => void
}

export function useUpdateActivityMutation(props?: Props) {
  const mutation = useMutation({
    mutationFn: (params: CreateUpdateActivityRequestParams) =>
      activityService.updateActivity(params),
    onSuccess: () => {
      props?.onSuccess?.()
    },
  })

  return mutation
}
