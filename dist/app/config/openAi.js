"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const _1 = __importDefault(require("."));
const openai = new openai_1.default({
    apiKey: _1.default.open_api_key,
});
exports.default = openai;
//# sourceMappingURL=openAi.js.map