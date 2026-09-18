import * as z from 'zod'

export const createExpenseScheme = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  amountInCents: z.number().min(1, 'O valor é obrigatório'),
  participantsIds: z
    .array(z.string())
    .min(1, 'Selecione pelo menos um participante'),
})

export type CreateExpenseFormData = z.infer<typeof createExpenseScheme>
