import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { SelectOptionData } from '@/components/ui/Select'

import { useGetUserListQuery } from '@/queries/useGetUserList.query'

import { useBottomSheetStore } from '@/store/useBottomSheetStore'

import { colors } from '@/theme/colors'

import {
  createExpenseScheme,
  CreateExpenseFormData,
} from './createExpense.scheme'

export function useCreateExpenseViewModel() {
  const { control, handleSubmit } = useForm<CreateExpenseFormData>({
    resolver: zodResolver(createExpenseScheme),
  })
  const { close } = useBottomSheetStore()
  const { data: participantsData } = useGetUserListQuery()

  const participantsOptions: SelectOptionData[] = participantsData?.map(
    (user) => ({
      id: user.id,
      label: user.name,
      imageURL: buildImageUrl(user.name),
      selected: false,
    }),
  )

  function buildImageUrl(name: string) {
    const params = new URLSearchParams({
      name,
      background: colors.gray['600'],
      color: colors.gray['100'],
      bold: 'true',
      rounded: 'true',
      size: '96',
    })

    return `https://ui-avatars.com/api/?${params.toString()}`
  }

  function handleClose() {
    close()
  }

  const handleCreateExpense = handleSubmit(onSubmit)

  async function onSubmit(dataForm: CreateExpenseFormData) {
    console.log('dataForm', dataForm)
  }

  return { control, participantsOptions, handleCreateExpense, handleClose }
}
