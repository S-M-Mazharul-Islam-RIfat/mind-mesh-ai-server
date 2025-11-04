import z, { email } from "zod";

const signupValidationSchema = z.object({
   body: z.object({
      fullName: z.string(),
      userName: z.string(),
      email: z.string(),
      password: z.string(),
      confirmPassword: z.string()
   })
})

const loginValidationSchema = z.object({
   body: z.object({
      email: z.string(),
      password: z.string(),
   })
})

const changeInfoValidationSchema = z.object({
   body: z.object({
      fullName: z.string().optional(),
      email: z.string().optional(),
      password: z.string().optional(),
   })
})

export const AuthValidation = {
   signupValidationSchema,
   loginValidationSchema,
   changeInfoValidationSchema
}