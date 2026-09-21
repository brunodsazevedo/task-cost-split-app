/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
/* eslint-disable react-hooks/set-state-in-effect */
import { createElement, useEffect, useMemo, useState } from 'react'

import { useModalStore } from '@/store/useModalStore'

import { Options, OptionsProps } from './Options'

import { SelectOptionData } from '.'

interface Props {
  value?: string | string[]
  options: SelectOptionData[]
  multiSelect?: boolean
  onChange?: (value: string | string[]) => void
}

export function useSelectViewModel({
  value,
  options = [],
  multiSelect = false,
  onChange,
}: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const { open, close } = useModalStore()

  useEffect(() => {
    const initialSelectedIds = options
      .filter((option) => option.selected)
      .map((option) => option.id)

    setSelectedIds(initialSelectedIds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const data = useMemo(
    () =>
      options.map((option) => ({
        ...option,
        selected: selectedIds.includes(option.id),
      })),
    [options, selectedIds],
  )

  const optionsSelected = data.filter((option) => option.selected)

  const optionSelectedLabel = !multiSelect ? optionsSelected[0]?.label : ''

  function handleConfirmSelection(optionsUpdated: string[]) {
    setSelectedIds(optionsUpdated)
    onChange?.(multiSelect ? optionsUpdated : optionsUpdated[0])
    close()
  }

  function handleOpenSelectModal() {
    open(
      createElement<OptionsProps>(Options, {
        options,
        multiSelect,
        initialSelectedIds: selectedIds,
        onConfirm: handleConfirmSelection,
      }),
    )
  }

  function handleRemoveSelectedOption(optionId: string) {
    const updated = selectedIds.filter((id) => id !== optionId)
    setSelectedIds(updated)
    onChange?.(multiSelect ? updated : updated[0])
  }

  return {
    value,
    optionsSelected,
    optionSelectedLabel,
    handleOpenSelectModal,
    handleRemoveSelectedOption,
  }
}
