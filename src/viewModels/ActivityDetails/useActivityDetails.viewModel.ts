import { createElement } from 'react'
import { router } from 'expo-router'
import { parseISO, format } from 'date-fns'

import { CreateExpense } from '@/components/ModalContent/CreateExpense'

import { useActivityDetailsQuery } from '@/queries/useActivityDetails.query'

import { useBottomSheetStore } from '@/store/useBottomSheetStore'
import {
  ActivityModal,
  ActivityModalProps,
} from '@/components/ModalContent/ActivityModal'
import { useModalStore } from '@/store/useModalStore'

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

  return {
    activityDetailsData,
    dateFormatted,
    isLoading,
    handleRefetch,
    handleBack,
    handleShowCreateExpenseModal,
    handleShowEditActivityModal,
  }
}
