import { format, parseISO } from 'date-fns'

import { ActivityData } from '@/interfaces/http/ActivityListResponse'

interface Props {
  activityData: ActivityData
  onActivityPress?: () => void
}

export function useActivityItemViewModel({
  activityData,
  onActivityPress,
}: Props) {
  const dateFormatted = format(parseISO(activityData.activityDate), 'dd/MM/yy')

  const totalAmount = activityData.totalAmountInCents / 100
  const totalAmountFormatted = totalAmount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return {
    activityData,
    dateFormatted,
    totalAmountFormatted,
    onActivityPress,
  }
}
