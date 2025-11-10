"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const comment_validation_1 = require("./comment.validation");
const comment_controller_1 = require("./comment.controller");
const user_constant_1 = require("../user/user.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-comment', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(comment_validation_1.CommentValidationSchema.createCommentValidationSchema), comment_controller_1.CommentControllers.createCommentController);
router.get('/:threadId', (0, auth_1.default)(user_constant_1.USER_ROLE.user), comment_controller_1.CommentControllers.getAllCommentsByThreadIdController);
exports.commentRoutes = router;
//# sourceMappingURL=comment.route.js.map