import { View, Text, FlatList, RefreshControl } from 'react-native'

import { Header } from '@/components/Header'
import { Button } from '@/components/ui/Button'
import { ActivityItem } from './components/ActivityItem'

import BulletListIcon from '@/assets/icons/bullet-list.svg'
import AddIcon from '@/assets/icons/add.svg'

import { colors } from '@/theme/colors'

import { useActivitiesViewModel } from './useActivitiesViewModel'

type Props = ReturnType<typeof useActivitiesViewModel>

export function ActivitiesView({
  activities,
  isLoading,
  handleLogout,
  handleShowCreateActivityModal,
  handleRefresh,
  handleActivityDetail,
}: Props) {
  return (
    <View className="flex-1 bg-base">
      <Header onSignout={handleLogout} />

      <FlatList
        data={activities ?? []}
        keyExtractor={(item) => `activity-item-${item.id}`}
        contentContainerClassName="flex-1 px-6 pb-8 gap-y-2"
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            colors={[colors['green-base']]}
          />
        }
        renderItem={({ item }) => (
          <ActivityItem
            activityData={item}
            onActivityPress={() => handleActivityDetail(item.id)}
          />
        )}
        ListHeaderComponent={
          <View className="py-4">
            <Text className="font-label text-xl leading-normal text-gray-100">
              Atividades
            </Text>

            <Text className="font-label text-base leading-normal text-gray-300">
              Organize suas despesas divididas
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center gap-y-4">
            <BulletListIcon height={24} width={24} color={colors.gray[400]} />

            <Text className="font-body text-sm text-center leading-normal text-gray-400">
              Você ainda não tem{'\n'}atividades criadas
            </Text>
          </View>
        }
      />

      <View className="absolute bottom-6 right-6 w-3/12">
        <Button leftIcon={AddIcon} onPress={handleShowCreateActivityModal}>
          Criar
        </Button>
      </View>
    </View>
  )
}
