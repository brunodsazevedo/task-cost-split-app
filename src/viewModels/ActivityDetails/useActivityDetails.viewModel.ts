import { createElement } from 'react'
import { router } from 'expo-router'
import { parseISO, format } from 'date-fns'

import { CreateExpense } from '@/components/ModalContent/CreateExpense'

import { useActivityDetailsQuery } from '@/queries/useActivityDetails.query'

import { useBottomSheetStore } from '@/store/useBottomSheetStore'

interface Props {
  activityId: string
}

export function useActivityDetailsViewModel({ activityId }: Props) {
  const {
    data: activityDetailsData,
    isLoading,
    refetch,
  } = useActivityDetailsQuery({ activityId })

  const { open } = useBottomSheetStore()

  const dateFormatted = activityDetailsData?.activityDate
    ? format(parseISO(activityDetailsData.activityDate), 'dd/MM/yy')
    : ''

  async function handleRefetch() {
    await refetch()
  }

  function handleBack() {
    router.back()
  }

  function handleShowCreateExpenseModal() {
    open({
      content: createElement(CreateExpense),
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
  }
}
