import * as z from 'zod'

export const signinScheme = z.object({
  email: z.email({ message: 'Informe um e-mail válido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
})

export type SigninFormData = z.infer<typeof signinScheme>
