import * as z from 'zod'

export const activityScheme = z.object({
  title: z.string().min(1, { message: 'O título é obrigatório' }),
  activityDate: z
    .string()
    .min(1, { message: 'A data da atividade é obrigatória' }),
})

export type ActivityFormData = z.infer<typeof activityScheme>
