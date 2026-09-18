import { View, Text } from 'react-native'

import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { InputController } from '@/components/ui/InputController'
import { InputDatePickerController } from '@/components/ui/InputDatePickerController'

import CloseIcon from '@/assets/icons/x.svg'
import CalendarIcon from '@/assets/icons/blank-calendar.svg'
import TrashIcon from '@/assets/icons/trash.svg'

import { useActivityModalViewModel } from './useActivityModalViewModel'

type Props = ReturnType<typeof useActivityModalViewModel>

export function ActivityModalView({
  control,
  isLoading,
  activityData,
  handleCreateActivity,
  handleCloseModal,
}: Props) {
  return (
    <View className="w-full gap-y-6 p-6 rounded-xl bg-gray-700">
      <View className="flex-row items-center justify-between">
        <Text className="font-label text-lg text-gray-100">
          {activityData ? 'Editar atividade' : 'Nova atividade'}
        </Text>

        <IconButton
          icon={CloseIcon}
          variant="secondary"
          onPress={handleCloseModal}
          className="bg-transparent border-0"
        />
      </View>

      <View className="gap-y-3">
        <View>
          <InputController
            control={control}
            name="title"
            placeholder="Título"
          />
        </View>

        <View>
          <InputDatePickerController
            control={control}
            name="activityDate"
            leftIcon={CalendarIcon}
            placeholder="Data"
          />
        </View>
      </View>

      <View>
        {activityData ? (
          <View className="flex-row items-center justify-between">
            <View>
              <IconButton variant="danger" icon={TrashIcon} />
            </View>

            <View className="w-4/12">
              <Button isLoading={isLoading} onPress={handleCreateActivity}>
                Salvar
              </Button>
            </View>
          </View>
        ) : (
          <Button isLoading={isLoading} onPress={handleCreateActivity}>
            Salvar
          </Button>
        )}
      </View>
    </View>
  )
}
