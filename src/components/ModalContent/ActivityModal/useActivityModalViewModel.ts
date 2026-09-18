import { router } from 'expo-router'
import { useForm } from 'react-hook-form'
import { formatISO, parseISO } from 'date-fns'

import { toast } from '@/components/ui/Toast'

import { zodResolver } from '@hookform/resolvers/zod'

import { useActivityListQuery } from '@/queries/useActivityList.query'
import { useCreateActivityMutation } from '@/queries/useCreateActivity.mutation'
import { useDeleteActivityMutation } from '@/queries/useDeleteActivity.mutation'
import { useUpdateActivityMutation } from '@/queries/useUpdateActivity.mutation'

import { useModalStore } from '@/store/useModalStore'
import { useUserStore } from '@/store/useUserStore'

import { AppError } from '@/utils/AppError'

import { ActivityDetailResponse } from '@/interfaces/http/ActivityDetailResponse'

import { activityScheme, ActivityFormData } from './activity.scheme'
import { useActivityDetailsQuery } from '@/queries/useActivityDetails.query'

type Props = {
  activityData?: ActivityDetailResponse
}

export function useActivityModalViewModel({ activityData }: Props) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(activityScheme),
    defaultValues: {
      title: activityData?.name ?? '',
      activityDate: !activityData?.activityDate
        ? undefined
        : parseISO(activityData.activityDate),
    },
  })
  const { close } = useModalStore()
  const { user } = useUserStore()
  const { refetch: refetchActivityList } = useActivityListQuery({
    userId: user?.id ?? '',
  })
  const { refetch: refetchActivityDetails } = useActivityDetailsQuery({
    activityId: activityData?.id ?? '',
  })
  const createActivityMutation = useCreateActivityMutation({ onSuccess: close })
  const updateActivityMutation = useUpdateActivityMutation({
    onSuccess: () => {
      refetchActivityDetails()
      close()
    },
  })
  const deleteActivityMutation = useDeleteActivityMutation({
    onSuccess: close,
  })

  async function onSubmit(dataForm: ActivityFormData) {
    const data = {
      ...dataForm,
      activityDate: formatISO(dataForm.activityDate),
    }

    try {
      if (activityData) {
        await updateActivityMutation.mutateAsync({
          queryParams: { activityId: activityData.id },
          data,
        })
      } else {
        await createActivityMutation.mutateAsync({ data })
      }

      refetchActivityList()

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

  async function handleDeleteActivity() {
    if (!activityData) return

    try {
      await deleteActivityMutation.mutateAsync(activityData.id)

      await refetchActivityList()

      router.back()

      toast.show({
        type: 'success',
        text1: 'Atividade excluída com sucesso',
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : 'Não foi possível excluir a atividade'

      toast.show({
        type: 'error',
        text1: 'Ocorreu um erro',
        text2: message,
      })
    }
  }

  return {
    control,
    isLoading:
      createActivityMutation.isPending || updateActivityMutation.isPending,
    activityData,
    isLoadingDelete: deleteActivityMutation.isPending,
    handleCreateActivity,
    handleCloseModal,
    handleDeleteActivity,
  }
}
