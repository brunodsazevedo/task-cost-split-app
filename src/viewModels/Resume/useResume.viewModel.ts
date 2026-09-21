import { useCallback } from 'react'
import { router, useFocusEffect } from 'expo-router'

import { useGetStatisticsQuery } from '@/queries/useGetStatistics.query'

import { useUserStore } from '@/store/useUserStore'

export function useResumeViewModel() {
  const { user } = useUserStore()

  const {
    data: statisticsData,
    isLoading,
    refetch,
  } = useGetStatisticsQuery({
    userId: user?.id ?? '',
  })

  const amountPaidValue = (statisticsData?.amountPaidInCents ?? 0) / 100
  const amountToPayValue = (statisticsData?.amountToPayInCents ?? 0) / 100
  const totalExpensesAmountValue =
    (statisticsData?.totalExpensesAmountInCents ?? 0) / 100

  const amountPaidFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amountPaidValue || 0)

  const amountToPayFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amountToPayValue || 0)

  const totalExpensesAmountFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalExpensesAmountValue || 0)

  const activitiesCountFormatted =
    statisticsData?.activitiesCount.toLocaleString('pt-BR', {
      minimumIntegerDigits: 2,
    })

  const expenseCountFormatted = statisticsData?.expensesCount.toLocaleString(
    'pt-BR',
    {
      minimumIntegerDigits: 2,
    },
  )

  const uniqueParticipantsCountFormatted =
    statisticsData?.uniqueParticipantsCount.toLocaleString('pt-BR', {
      minimumIntegerDigits: 2,
    })

  function handleGoActivities() {
    router.push('/(private)/(tabs)/activities')
  }

  useFocusEffect(
    useCallback(() => {
      refetch()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  )

  return {
    statisticsData,
    isLoading,
    activitiesCountFormatted,
    expenseCountFormatted,
    amountPaidFormatted,
    amountToPayFormatted,
    totalExpensesAmountFormatted,
    uniqueParticipantsCountFormatted,
    handleGoActivities,
  }
}
