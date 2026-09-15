import * as z from 'zod'

export const signupScheme = z.object({
  name: z.string().min(1, { message: 'Informe seu nome' }),
  email: z.email({ message: 'Informe um e-mail válido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 6 caracteres' }),
})

export type SignupDataForm = z.infer<typeof signupScheme>
