import { Tabs } from 'expo-router'

import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fonts'

import BulletListIcon from '@/assets/icons/bullet-list.svg'
import ChartPieIcon from '@/assets/icons/pie-chart.svg'
import ChartPieSolidIcon from '@/assets/icons/pie-chart-solid.svg'
import UsersGroupIcon from '@/assets/icons/user-multiple-group.svg'
import UsersGroupSolidIcon from '@/assets/icons/user-multiple-group-solid.svg'

export default function PrivateLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors['green-base'],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarLabelStyle: {
          fontFamily: fontFamily.label,
          fontSize: 14,
          marginTop: 8,
        },
        tabBarStyle: {
          height: 110,
          paddingTop: 20,
          backgroundColor: colors.gray[700],
        },
      }}
      initialRouteName="resume"
    >
      <Tabs.Screen
        name="activities"
        options={{
          title: 'Atividades',
          tabBarIcon: ({ size, color }) => (
            <BulletListIcon height={size} width={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="resume"
        options={{
          title: 'Resumo',
          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <ChartPieSolidIcon height={size} width={size} color={color} />
            ) : (
              <ChartPieIcon height={size} width={size} color={color} />
            ),
        }}
      />

      <Tabs.Screen
        name="participants"
        options={{
          title: 'Participantes',
          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <UsersGroupSolidIcon height={size} width={size} color={color} />
            ) : (
              <UsersGroupIcon height={size} width={size} color={color} />
            ),
        }}
      />
    </Tabs>
  )
}
