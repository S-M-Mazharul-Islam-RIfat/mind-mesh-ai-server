import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/signup', validateRequest(AuthValidation.signupValidationSchema), AuthControllers.signupUserController)
router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUserController)
router.post('/refresh-token', validateRequest(AuthValidation.refreshTokenValidationSchema), AuthControllers.refreshTokenController)
router.patch('/change-user-info', auth(USER_ROLE.user), validateRequest(AuthValidation.changeUserInfoValidationSchema), AuthControllers.changeUserInfoController)
router.patch('/change-password', auth(USER_ROLE.user), validateRequest(AuthValidation.changePasswordValidationSchema), AuthControllers.changePasswordController)

export const authRoutes = router;