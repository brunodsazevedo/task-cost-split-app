import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { IconButton } from '@/components/ui/IconButton'

import LogoIcon from '@/assets/images/logo.svg'
import LogoNameIcon from '@/assets/images/logo-name.svg'
import SignoutIcon from '@/assets/icons/signout.svg'

interface Props {
  onSignout?: () => void
}

export function Header({ onSignout }: Props) {
  return (
    <SafeAreaView
      edges={['top']}
      className="flex-row items-center justify-between px-6 py-4"
    >
      <View className="flex-row items-center gap-x-2">
        <LogoIcon height={18} width={18} />

        <LogoNameIcon height={24} />
      </View>

      <IconButton
        variant="danger"
        icon={SignoutIcon}
        className="bg-transparent border-0"
        onPress={onSignout}
      />
    </SafeAreaView>
  )
}
