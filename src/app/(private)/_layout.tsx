import { Tabs } from 'expo-router'

export default function PrivateLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="activities" />

      <Tabs.Screen name="resume" />

      <Tabs.Screen name="participants" />
    </Tabs>
  )
}
