import { View, Text, FlatList, RefreshControl } from 'react-native'

import { HeaderTab } from '@/components/HeaderTab'
import { ParticipantItem } from './components/ParticipantItem'

import { colors } from '@/theme/colors'

import { useParticipantsViewModel } from './useParticipants.viewModel'

import UserGroupIcon from '@/assets/icons/user-multiple-group.svg'

type Props = ReturnType<typeof useParticipantsViewModel>

export function ParticipantsView({ participants, isLoading, refetch }: Props) {
  return (
    <View className="flex-1 bg-base">
      <HeaderTab />

      <FlatList
        data={participants}
        keyExtractor={(item) => `${item.id}`}
        contentContainerClassName="flex-1 px-6 pt-6 pb-8 gap-y-2"
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            colors={[colors['green-base']]}
          />
        }
        renderItem={({ item }) => <ParticipantItem data={item} />}
        ListHeaderComponent={
          <View className="gap-y-1">
            <Text className="font-label text-xl leading-normal text-gray-100">
              Participantes
            </Text>

            <Text className="font-body text-base leading-normal text-gray-300">
              Pessoas com quem você já dividiu tarefas
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center gap-y-6">
            <UserGroupIcon height={24} width={24} color={colors.gray[400]} />

            <Text className="font-body text-sm text-center leading-normal text-gray-400">
              Você ainda não adicionou{'\n'}participantes em atividades
            </Text>
          </View>
        }
      />
    </View>
  )
}
