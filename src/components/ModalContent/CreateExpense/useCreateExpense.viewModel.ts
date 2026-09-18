import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { SelectOptionData } from '@/components/ui/Select'
import { toast } from '@/components/ui/Toast'

import { useGetUserListQuery } from '@/queries/useGetUserList.query'
import { useCreateExpenseMutation } from '@/queries/useCreateExpense.mutation'

import { useBottomSheetStore } from '@/store/useBottomSheetStore'
import { useUserStore } from '@/store/useUserStore'

import { colors } from '@/theme/colors'

import { AppError } from '@/utils/AppError'

import {
  createExpenseScheme,
  CreateExpenseFormData,
} from './createExpense.scheme'

type Props = {
  activityId: string
  onSuccess?: () => void
}

export function useCreateExpenseViewModel({ activityId, onSuccess }: Props) {
  const { control, handleSubmit } = useForm<CreateExpenseFormData>({
    resolver: zodResolver(createExpenseScheme),
  })
  const { close } = useBottomSheetStore()
  const { data: usersData } = useGetUserListQuery()
  const { user } = useUserStore()
  const createExpenseMutation = useCreateExpenseMutation()

  const participantsData = usersData?.filter(
    (userData) => userData.id !== user?.id,
  )

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
    const data = {
      ...dataForm,
      payerId: user?.id ?? '',
      amountInCents: dataForm.amountInCents * 100,
    }

    try {
      await createExpenseMutation.mutateAsync({ data, params: { activityId } })

      close()

      onSuccess?.()

      toast.show({
        type: 'success',
        text1: 'Despesa criada com sucesso!',
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : 'Não foi possível criar a despesa. Tente novamente mais tarde.'

      toast.show({
        type: 'error',
        text1: 'Erro ao criar despesa',
        text2: message,
      })
    }
  }

  return {
    control,
    participantsOptions,
    isLoading: createExpenseMutation.isPending,
    handleCreateExpense,
    handleClose,
  }
}
