import { createElement } from 'react'
import { router } from 'expo-router'

import { useUserStore } from '@/store/useUserStore'

import { useActivityListQuery } from '@/queries/useActivityList.query'

import { useModalStore } from '@/store/useModalStore'

import { ActivityModal } from '../../components/ModalContent/ActivityModal'

export function useActivitiesViewModel() {
  const { user, logout } = useUserStore()
  const { open } = useModalStore()

  const { data, isLoading, isError, refetch } = useActivityListQuery({
    userId: user?.id ?? '',
  })

  function handleLogout() {
    logout()
  }

  function handleShowCreateActivityModal() {
    open(createElement(ActivityModal))
  }

  async function handleRefresh() {
    await refetch()
  }

  function handleActivityDetail(activityId: string) {
    router.push(`/activities/${activityId}`)
  }

  return {
    activities: data,
    isLoading,
    isError,
    handleLogout,
    handleShowCreateActivityModal,
    handleRefresh,
    handleActivityDetail,
  }
}
