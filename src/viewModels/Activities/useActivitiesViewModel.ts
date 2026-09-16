import { createElement } from 'react'

import { useUserStore } from '@/store/useUserStore'

import { useActivityListQuery } from '@/queries/useActivityList.query'

import { useModalStore } from '@/store/useModalStore'

import { ActivityModal } from './components/ActivityModal'

export function useActivitiesViewModel() {
  const { user, logout } = useUserStore()
  const { open } = useModalStore()

  const { data, isLoading, isError } = useActivityListQuery({
    userId: user?.id ?? '',
  })

  function handleLogout() {
    logout()
  }

  function handleShowCreateActivityModal() {
    open(createElement(ActivityModal))
  }

  return {
    activities: data,
    isLoading,
    isError,
    handleLogout,
    handleShowCreateActivityModal,
  }
}
