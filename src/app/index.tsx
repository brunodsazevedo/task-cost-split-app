import { Redirect } from 'expo-router'

import { useUserStore } from '@/store/useUserStore'

export default function StartApp() {
  const { token } = useUserStore()

  if (token) {
    return <Redirect href="/(private)/(tabs)/resume" />
  }

  return <Redirect href="/(public)/signin" />
}
