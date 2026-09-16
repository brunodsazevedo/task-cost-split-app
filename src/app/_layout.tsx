import { StatusBar } from 'react-native'
import { Stack } from 'expo-router'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { toast as Toast, toastConfig } from '@/components/ui/Toast'
import { Modal } from '@/components/ui/Modal'

import { useUserStore } from '@/store/useUserStore'

import '@/theme/global.css'

const queryClient = new QueryClient()

function RootNavigator() {
  const { token } = useUserStore()

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!token}>
        <Stack.Screen name="(private)" />
      </Stack.Protected>

      <Stack.Protected guard={!token}>
        <Stack.Screen name="(public)" />
      </Stack.Protected>
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="light-content" translucent />

      <RootNavigator />

      <Modal />

      <Toast config={toastConfig} />
    </QueryClientProvider>
  )
}
