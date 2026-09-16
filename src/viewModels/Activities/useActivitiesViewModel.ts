import { useUserStore } from '@/store/useUserStore'

import { useActivityListQuery } from '@/queries/useActivityList.query'

export function useActivitiesViewModel() {
  const { user, logout } = useUserStore()

  const { data, isLoading, isError } = useActivityListQuery({
    userId: user?.id ?? '',
  })

  function handleLogout() {
    logout()
  }

  return { activities: data, isLoading, isError, handleLogout }
}
