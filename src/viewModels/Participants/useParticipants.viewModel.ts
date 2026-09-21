import { useMemo } from 'react'

import { useActivityListQuery } from '@/queries/useActivityList.query'

import { useUserStore } from '@/store/useUserStore'

import { ActivityData } from '@/interfaces/http/ActivityListResponse'
import { ParticipantSummary } from '@/interfaces/ParticipantSummary'

export function useParticipantsViewModel() {
  const { user } = useUserStore()

  const { data, isLoading, isError, refetch } = useActivityListQuery({
    userId: user?.id ?? '',
  })

  const participants = useMemo(
    () => onGroupParticipantsByActivity(data ?? []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  )

  function onGroupParticipantsByActivity(
    activitiesData: ActivityData[],
  ): ParticipantSummary[] {
    const participantsMap = new Map<string, ParticipantSummary>()

    for (const activity of activitiesData) {
      for (const participant of activity.participants) {
        const existing = participantsMap.get(participant.id)
        const isCurrentUser = participant.id === user?.id

        if (existing && !isCurrentUser) {
          participantsMap.set(participant.id, {
            ...existing,
            activitiesCount: existing.activitiesCount + 1,
          })
        } else if (!existing && !isCurrentUser) {
          participantsMap.set(participant.id, {
            id: participant.id,
            name: participant.name,
            email: participant.email,
            activitiesCount: 1,
          })
        }
      }
    }

    return Array.from(participantsMap.values())
  }

  return { participants, isLoading, isError, refetch }
}
