import { platformSelect } from 'nativewind/theme'

export const fontFamily = {
  body: platformSelect({
    ios: 'Inter-Regular',
    android: 'Inter_400Regular',
    default: 'Inter_400Regular',
  }),
  label: platformSelect({
    ios: 'Inter-SemiBold',
    android: 'Inter_600SemiBold',
    default: 'Inter_600SemiBold',
  }),
  heading: platformSelect({
    ios: 'Sora-Bold',
    android: 'Sora_700Bold',
    default: 'Sora_700Bold',
  }),
}
