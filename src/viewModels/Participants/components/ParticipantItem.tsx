import { View, Text, Image } from 'react-native'

import { ParticipantSummary } from '@/interfaces/ParticipantSummary'

import { buildAvatarUrl } from '@/utils/buildAvatarUrl'

type Props = {
  data: ParticipantSummary
}

export function ParticipantItem({ data }: Props) {
  const avatarInitialsUri = buildAvatarUrl(data.name)

  return (
    <View className="flex-row items-center gap-x-4 border border-gray-600 rounded-xl p-3">
      <Image
        alt={`uri-avatar-${data.id}`}
        source={{ uri: avatarInitialsUri }}
        className="h-10 w-10 rounded-full"
      />

      <View>
        <Text className="font-label text-base text-gray-100">{data.name}</Text>

        <Text className="font-body text-sm text-gray-400">
          Em {data.activitiesCount} atividades
        </Text>
      </View>
    </View>
  )
}
