import z, { email } from "zod";

const signupValidationSchema = z.object({
   body: z.object({
      fullName: z.string(),
      userName: z.string(),
      email: z.string(),
      password: z.string(),
   })
})

const loginValidationSchema = z.object({
   body: z.object({
      email: z.string(),
      password: z.string(),
   })
})

const refreshTokenValidationSchema = z.object({
   cookies: z.object({
      refreshToken: z.string().min(1, "Refresh token is required")
   })
})

export const AuthValidation = {
   signupValidationSchema,
   loginValidationSchema,
   refreshTokenValidationSchema,
}