import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CommentValidationSchema } from './comment.validation';
import { CommentControllers } from './comment.controller';

const router = express.Router();

router.post('/create-comment', validateRequest(CommentValidationSchema.createCommentValidationSchema), CommentControllers.createCommentController);

router.get('/:threadId', CommentControllers.getAllCommentsByThreadIdController)

export const commentRoutes = router; 