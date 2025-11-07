import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.get('/:id', UserControllers.getUserInfoByUserNameController)

export const userRoutes = router;