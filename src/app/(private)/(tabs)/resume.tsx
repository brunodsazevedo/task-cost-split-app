import { View, Text, TouchableOpacity } from 'react-native'

import { useUserStore } from '@/store/useUserStore'

export default function Resume() {
  const { logout } = useUserStore()

  return (
    <View className="flex-1 items-center justify-center">
      <Text>resume</Text>

      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}
