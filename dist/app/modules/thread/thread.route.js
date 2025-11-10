"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.threadRoutes = void 0;
const express_1 = __importDefault(require("express"));
const thread_controller_1 = require("./thread.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const thread_validation_1 = require("./thread.validation");
const user_constant_1 = require("../user/user.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-thread', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(thread_validation_1.ThreadValidationSchema.createThreadValidationSchema), thread_controller_1.ThreadControllers.createThreadController);
router.get('/', thread_controller_1.ThreadControllers.getAllThreadController);
router.get('/thread/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), thread_controller_1.ThreadControllers.getSingleThreadController);
exports.threadRoutes = router;
//# sourceMappingURL=thread.route.js.map