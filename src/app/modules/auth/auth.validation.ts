import z from "zod";

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

const changeUserInfoValidationSchema = z.object({
   body: z.object({
      _id: z.string(),
      fullName: z.string().optional(),
      userName: z.string().optional(),
      email: z.string().optional(),
      password: z.string().optional(),
   })
})

const changePasswordValidationSchema = z.object({
   body: z.object({
      _id: z.string(),
      email: z.string(),
      oldPassword: z.string(),
      newPassword: z.string()
   })
})

export const AuthValidation = {
   signupValidationSchema,
   loginValidationSchema,
   refreshTokenValidationSchema,
   changeUserInfoValidationSchema,
   changePasswordValidationSchema
}