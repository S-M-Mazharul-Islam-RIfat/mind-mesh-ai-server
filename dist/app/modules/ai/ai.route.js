"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ai_controller_1 = require("./ai.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post('/generate-thread-summary', (0, auth_1.default)(user_constant_1.USER_ROLE.user), ai_controller_1.aiControllers.generateThreadSummaryController);
exports.aiRoutes = router;
//# sourceMappingURL=ai.route.js.map