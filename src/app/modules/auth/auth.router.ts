import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post('/signup', validateRequest(AuthValidation.signupValidationSchema), AuthControllers.signupUserController)
router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUserController)
router.post('/refresh-token', validateRequest(AuthValidation.refreshTokenValidationSchema), AuthControllers.refreshTokenController)
router.patch('/change-user-info', validateRequest(AuthValidation.changeUserInfoValidationSchema), AuthControllers.changeUserInfoController)
router.patch('/change-password', validateRequest(AuthValidation.changePasswordValidationSchema), AuthControllers.changePasswordController)

export const authRoutes = router;