"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiServices = void 0;
const openAi_1 = __importDefault(require("../../config/openAi"));
const generateThreadSummary = async (payload) => {
    const res = await openAi_1.default.chat.completions.create({
        model: "gpt-5-nano",
        messages: [
            {
                role: "system",
                content: `
               You are a helpful assistant that analyzes and summarizes forum threads.Detect and flag any inappropriate or spam content if present. Then, write a concise summary of the thread in 4-5 clear and natural lines.Use friendly, human-like English without repetition or unnecessary details.Do not use bullet points or formatting — just plain text.
               `,
            },
            {
                role: "user",
                content: `Summarize this thread:\n\n${payload}`,
            },
        ],
    });
    return res?.choices[0]?.message?.content;
};
exports.aiServices = {
    generateThreadSummary
};
//# sourceMappingURL=ai.service.js.map