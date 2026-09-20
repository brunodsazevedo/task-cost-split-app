import { colors } from '@/theme/colors'

const statusPaymentStyles = {
  paid: {
    backgroundColor: colors['success-dark'],
    textColor: colors['success-light'],
    textLabel: 'Pago',
  },
  pending: {
    backgroundColor: colors['danger-dark'],
    textColor: colors['danger-light'],
    textLabel: 'Pendente',
  },
  partial: {
    backgroundColor: colors['alert-dark'],
    textColor: colors['alert-light'],
    textLabel: 'Parcial',
  },
}

export function getStatusPaymentStyles(paymentStatus: string) {
  const status = paymentStatus.toLowerCase() as keyof typeof statusPaymentStyles

  return statusPaymentStyles[status]
}
