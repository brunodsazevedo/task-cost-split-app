import { createElement, useCallback } from 'react'
import { router, useFocusEffect } from 'expo-router'
import { parseISO, format } from 'date-fns'

import { CreateExpense } from '@/components/ModalContent/CreateExpense'
import {
  ActivityModal,
  ActivityModalProps,
} from '@/components/ModalContent/ActivityModal'

import { useActivityDetailsQuery } from '@/queries/useActivityDetails.query'

import { useBottomSheetStore } from '@/store/useBottomSheetStore'
import { useModalStore } from '@/store/useModalStore'

import { buildAvatarUrl } from '@/utils/buildAvatarUrl'

interface Props {
  activityId: string
}

export function useActivityDetailsViewModel({ activityId }: Props) {
  const {
    data: activityDetailsData,
    isLoading,
    refetch,
  } = useActivityDetailsQuery({ activityId })

  const { open: openBottomSheet } = useBottomSheetStore()
  const { open: openModal } = useModalStore()

  const dateFormatted = activityDetailsData?.activityDate
    ? format(parseISO(activityDetailsData.activityDate), 'dd/MM/yy')
    : ''

  const participantsAvatarUrls =
    activityDetailsData?.participants.map((participant) => ({
      avatarUrl: buildAvatarUrl(participant.name),
    })) ?? []

  const totalExpenses = (activityDetailsData?.totalAmountInCents ?? 0) / 100

  const totalExpensesFormatted = totalExpenses.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  async function handleRefetch() {
    await refetch()
  }

  function handleBack() {
    router.back()
  }

  function handleShowEditActivityModal() {
    openModal(
      createElement<ActivityModalProps>(ActivityModal, {
        activityData: activityDetailsData,
      }),
    )
  }

  function handleShowCreateExpenseModal() {
    openBottomSheet({
      content: createElement(CreateExpense, {
        activityId,
        onSuccess: () => handleRefetch(),
      }),
      config: {
        enablePanDownToClose: false,
      },
    })
  }

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [refetch]),
  )

  return {
    activityDetailsData,
    dateFormatted,
    isLoading,
    participantsAvatarUrls,
    totalExpenses,
    totalExpensesFormatted,
    handleRefetch,
    handleBack,
    handleShowCreateExpenseModal,
    handleShowEditActivityModal,
  }
}
