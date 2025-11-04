import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post('/signup', validateRequest(AuthValidation.signupValidationSchema), AuthControllers.signupUserController)
router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUserController)
router.post('/change-user-info/:userName', validateRequest(AuthValidation.changeInfoValidationSchema), AuthControllers.changeUserInfoController)

export const authRoutes = router;