type ConsolidatedPaymentStatus = 'paid' | 'pending' | 'partial'

type ParticipantPaymentStatus = {
  paymentStatus: string
}

const statusLabels: Record<ConsolidatedPaymentStatus, string> = {
  paid: 'Pago',
  pending: 'Pendente',
  partial: 'Parcial',
}

export function getConsolidatedPaymentStatus(
  participants: ParticipantPaymentStatus[],
) {
  const allPaid = participants.every(
    (participant) => participant.paymentStatus === 'paid',
  )
  const allPending = participants.every(
    (participant) => participant.paymentStatus === 'pending',
  )

  const status: ConsolidatedPaymentStatus = allPaid
    ? 'paid'
    : allPending
      ? 'pending'
      : 'partial'

  return {
    status,
    statusLabel: statusLabels[status],
  }
}
