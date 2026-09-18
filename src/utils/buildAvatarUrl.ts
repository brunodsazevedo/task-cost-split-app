import { colors } from '@/theme/colors'

export function buildAvatarUrl(name: string) {
  const params = new URLSearchParams({
    name,
    background: colors.gray['600'],
    color: colors.gray['100'],
    bold: 'true',
    rounded: 'true',
    size: '96',
  })

  return `https://ui-avatars.com/api/?${params.toString()}`
}
