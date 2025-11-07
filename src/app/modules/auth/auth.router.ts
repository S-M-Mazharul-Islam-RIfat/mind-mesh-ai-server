import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post('/signup', validateRequest(AuthValidation.signupValidationSchema), AuthControllers.signupUserController)
router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUserController)
router.post('/refresh-token', validateRequest(AuthValidation.refreshTokenValidationSchema), AuthControllers.refreshTokenController)

export const authRoutes = router;