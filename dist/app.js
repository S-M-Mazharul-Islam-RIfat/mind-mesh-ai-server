"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("./app/config"));
const app = (0, express_1.default)();
// CORS
app.use((0, cors_1.default)({
    origin: `http://localhost:${config_1.default.client_port}`,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// built-in middlewares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Morgan logger
app.use((0, morgan_1.default)('dev'));
// API routes
app.use('/api/v1', routes_1.default);
// global error handler
app.use(globalErrorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map