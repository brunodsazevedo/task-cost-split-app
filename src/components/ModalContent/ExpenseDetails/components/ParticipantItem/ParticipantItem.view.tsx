import { View, Text, TouchableOpacity, Image } from 'react-native'
import { twMerge } from 'tailwind-merge'

import { useParticipantItemViewModel } from './useParticipantItem.viewModel'

type Props = ReturnType<typeof useParticipantItemViewModel>

export function ParticipantItemView({
  participantData,
  participantAvatarUri,
  amountFormatted,
  handleTogglePaymentStatus,
}: Props) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-x-4">
        <Image
          alt={`avatar-${participantData.userId}`}
          source={{ uri: participantAvatarUri }}
          className="h-11 w-11 rounded-full"
        />

        <View>
          <Text className="font-label text-base leading-normal text-gray-200">
            {participantData.name}
          </Text>

          <Text className="font-body text-sm leading-normal text-gray-300">
            {amountFormatted}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row p-1 rounded-lg border border-gray-600 bg-gray-800"
        onPress={handleTogglePaymentStatus}
      >
        <View
          className={twMerge(
            'px-2 py-1 rounded-md',
            participantData.paymentStatus === 'pending' &&
              'border border-gray-600 bg-danger-dark',
          )}
        >
          <Text
            className={twMerge(
              'font-body text-xs text-gray-300',
              participantData.paymentStatus === 'pending' &&
                'text-danger-light',
            )}
          >
            Pendente
          </Text>
        </View>

        <View
          className={twMerge(
            'px-2 py-1 rounded-md',
            participantData.paymentStatus === 'paid' &&
              'border border-gray-600 bg-success-dark',
          )}
        >
          <Text
            className={twMerge(
              'font-body text-xs text-gray-300',
              participantData.paymentStatus === 'paid' && 'text-success-light',
            )}
          >
            Pago
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
