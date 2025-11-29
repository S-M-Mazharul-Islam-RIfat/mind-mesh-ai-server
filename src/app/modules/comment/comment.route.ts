import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CommentValidationSchema } from './comment.validation';
import { CommentControllers } from './comment.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/create-comment', auth(USER_ROLE.user), validateRequest(CommentValidationSchema.createCommentValidationSchema), CommentControllers.createCommentController);
router.patch('/:commentId/add-like', CommentControllers.addLikeInCommentController)
router.patch('/:commentId/remove-like', CommentControllers.removeLikeFromCommentController)
router.get('/:threadId', auth(USER_ROLE.user), CommentControllers.getAllCommentsByThreadIdController)

export const commentRoutes = router; 