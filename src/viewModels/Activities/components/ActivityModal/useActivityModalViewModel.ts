import { useForm } from 'react-hook-form'

import { toast } from '@/components/ui/Toast'

import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateActivityMutation } from '@/queries/useCreateActivity.mutation'
import { useActivityListQuery } from '@/queries/useActivityList.query'

import { useModalStore } from '@/store/useModalStore'
import { useUserStore } from '@/store/useUserStore'

import { AppError } from '@/utils/AppError'

import { activityScheme, ActivityFormData } from './activity.scheme'

export function useActivityModalViewModel() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(activityScheme),
  })
  const { close } = useModalStore()
  const createActivityMutation = useCreateActivityMutation({ onSuccess: close })
  const { user } = useUserStore()
  const { refetch } = useActivityListQuery({
    userId: user?.id ?? '',
  })

  async function onSubmit(dataForm: ActivityFormData) {
    try {
      await createActivityMutation.mutateAsync({ data: dataForm })

      refetch()

      toast.show({
        type: 'success',
        text1: 'Atividade criada com sucesso',
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : 'Não foi possível criar a atividade'

      toast.show({
        type: 'error',
        text1: 'Ocorreu um erro',
        text2: message,
      })
    }
  }

  const handleCreateActivity = handleSubmit(onSubmit)

  function handleCloseModal() {
    close()
  }

  return {
    control,
    isLoading: createActivityMutation.isPending,
    handleCreateActivity,
    handleCloseModal,
  }
}
