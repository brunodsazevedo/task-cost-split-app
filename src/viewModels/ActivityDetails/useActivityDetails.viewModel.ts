import { router } from 'expo-router'
import { parseISO, format } from 'date-fns'

import { useActivityDetailsQuery } from '@/queries/useActivityDetails.query'

interface Props {
  activityId: string
}

export function useActivityDetailsViewModel({ activityId }: Props) {
  const {
    data: activityDetailsData,
    isLoading,
    refetch,
  } = useActivityDetailsQuery({ activityId })

  const dateFormatted = format(
    parseISO(activityDetailsData?.activityDate ?? ''),
    'dd/MM/yy',
  )

  async function handleRefetch() {
    await refetch()
  }

  function handleBack() {
    router.back()
  }

  return {
    activityDetailsData,
    dateFormatted,
    isLoading,
    handleRefetch,
    handleBack,
  }
}
