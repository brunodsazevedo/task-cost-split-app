import { useMutation } from '@tanstack/react-query'

import * as activityService from '@/services/activity.service'

type Props = {
  onSuccess?: () => void
}

export function useDeleteActivityMutation({ onSuccess }: Props) {
  const mutation = useMutation({
    mutationFn: (activityId: string) =>
      activityService.deleteActivity(activityId),
    onSuccess: () => {
      onSuccess?.()
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return mutation
}
