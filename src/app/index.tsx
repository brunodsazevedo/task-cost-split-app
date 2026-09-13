import { Text, View } from 'react-native'

export default function Page() {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <View className="flex-1 items-center justify-center max-w-[960px] mx-auto">
        <Text className="font-heading leading-snug text-6xl">Hello World</Text>
        <Text className="font-body leading-normal text-2xl">
          This is the first page of your app.
        </Text>
      </View>
    </View>
  )
}
